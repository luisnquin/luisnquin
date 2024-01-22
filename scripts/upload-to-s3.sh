#!/bin/sh

log_and_exit_1() {
    printf "\033[38;2;201;71;71m%s: %s\033[0m\n" "error" "$1"
    exit 1
}

validate_inputs() {
    if [ "$FILE_PATH" = "" ]; then
        log_and_exit_1 "missing input file"
    elif [ ! -f "$FILE_PATH" ]; then
        log_and_exit_1 "file '$FILE_PATH' doesn't exist"
    fi

    if [ "$AWS_KEY" = "" ]; then
        log_and_exit_1 "missing 'AWS_KEY' environment variable"
    elif [ "$AWS_SECRET" = "" ]; then
        log_and_exit_1 "missing 'AWS_SECRET' environment variable"
    elif [ "$S3_ACCESS_CONTROL" = "" ]; then
        log_and_exit_1 "missing 'S3_ACCESS_CONTROL' environment variable"
    elif [ "$S3_BUCKET_NAME" = "" ]; then
        log_and_exit_1 "missing 'S3_BUCKET_NAME' environment variable"
    elif [ "$AWS_REGION" = "" ]; then
        log_and_exit_1 "missing 'AWS_REGION' environment variable"
    fi

    # https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl
    valid_acl_values="private public-read public-read-write aws-exec-read authenticated-read bucket-owner-read bucket-owner-full-control"

    # https://github.com/aws/aws-sdk-java/blob/master/aws-java-sdk-core/src/main/java/com/amazonaws/regions/Regions.java
    valid_region_values="us-gov-west-1 us-gov-east-1 us-east-1 us-east-2 us-west-1 us-west-2 eu-west-1 eu-west-2 eu-west-3 eu-central-1 eu-central-2 eu-north-1 eu-south-1 eu-south-2 ap-east-1 ap-south-1 ap-south-2 ap-southeast-1 ap-southeast-2 ap-southeast-3 ap-southeast-4 ap-northeast-1 ap-northeast-2 ap-northeast-3 sa-east-1 cn-north-1 cn-northwest-1 ca-central-1 ca-west-1 me-central-1 me-south-1 af-south-1 us-iso-east-1 us-isob-east-1 us-iso-west-1 il-central-1"
    if ! echo "$valid_region_values" | grep -q "\\b$AWS_REGION\\b"; then
        log_and_exit_1 "invalid 'AWS_REGION'"
    fi

    if ! echo "$valid_acl_values" | grep -q "\\b$S3_ACCESS_CONTROL\\b"; then
        log_and_exit_1 "invalid 'S3_ACCESS_CONTROL'"
    fi
}

generate_aws_string_sign_v4() {
    kSecret="AWS4$1"
    kDate=$(printf '%s' "$2" | openssl dgst -sha256 -hex -mac HMAC -macopt "key:${kSecret}" 2>/dev/null | sed 's/^.* //')
    kRegion=$(printf '%s' "$3" | openssl dgst -sha256 -hex -mac HMAC -macopt "hexkey:${kDate}" 2>/dev/null | sed 's/^.* //')
    kService=$(printf '%s' "$4" | openssl dgst -sha256 -hex -mac HMAC -macopt "hexkey:${kRegion}" 2>/dev/null | sed 's/^.* //')
    kSigning=$(printf 'aws4_request' | openssl dgst -sha256 -hex -mac HMAC -macopt "hexkey:${kService}" 2>/dev/null | sed 's/^.* //')
    signedString=$(printf '%s' "$5" | openssl dgst -sha256 -hex -mac HMAC -macopt "hexkey:${kSigning}" 2>/dev/null | sed 's/^.* //')
    printf '%s' "${signedString}"
}

upload_file_to_S3() {
    if [ "$CONTENT_TYPE" = "" ]; then
        CONTENT_TYPE="$(file --mime-type "$FILE_PATH" | cut -d':' -f2 | tr -d '[:space:]')"
    fi

    file_name=$(basename "$FILE_PATH")

    if [ "$S3_OBJECT_NAME" = "" ]; then
        S3_OBJECT_NAME="$file_name"
    fi

    if [ ! "$S3_BUCKET_PATH" = "" ]; then
        # Removing the slash at the beginning if needed
        S3_BUCKET_PATH="${S3_BUCKET_PATH#\/}"
        # Adding slash at the end if needed
        S3_BUCKET_PATH="${S3_BUCKET_PATH%/}/"
    fi

    date_time=$(date -u +'%Y%m%dT%H%M%SZ')
    date=$(date -u +'%Y%m%d')

    encryption_type='AES256'
    auth_type='AWS4-HMAC-SHA256'

    storage_class="${S3_STORAGE_CLASS:-STANDARD}"
    aws_key_id="$AWS_KEY"
    aws_secret_key="$AWS_SECRET"
    region="$AWS_REGION"
    service="s3"

    # The order is important
    signed_headers='content-type;host;x-amz-acl;x-amz-content-sha256;x-amz-date;x-amz-server-side-encryption;x-amz-storage-class'

    payload_sha256=$(openssl dgst -sha256 -hex <"${FILE_PATH}" 2>/dev/null | sed 's/^.* //')

    canonical_request="\
PUT
/$S3_BUCKET_PATH$S3_OBJECT_NAME

content-type:$CONTENT_TYPE
host:$S3_BUCKET_NAME.$service.amazonaws.com
x-amz-acl:$S3_ACCESS_CONTROL
x-amz-content-sha256:$payload_sha256
x-amz-date:$date_time
x-amz-server-side-encryption:$encryption_type
x-amz-storage-class:$storage_class

$signed_headers
$payload_sha256"

    # echo "canonical_request: $canonical_request"

    canonical_request_hash=$(printf '%s' "${canonical_request}" | openssl dgst -sha256 -hex 2>/dev/null | sed 's/^.* //')

    string_to_sign="\
$auth_type
$date_time
$date/$region/$service/aws4_request
$canonical_request_hash"

    signature=$(generate_aws_string_sign_v4 "${aws_secret_key}" "${date}" "${region}" "${service}" "${string_to_sign}")

    url="https://$S3_BUCKET_NAME.s3.amazonaws.com/$S3_BUCKET_PATH$S3_OBJECT_NAME"

    printf "\033[38;2;235;180;136mUploading '%s' to '%s'...\033[0m\n" "$FILE_PATH" "$url"

    curl -X PUT -T "$FILE_PATH" \
        -H "x-amz-server-side-encryption: $encryption_type" \
        -H "x-amz-content-sha256: $payload_sha256" \
        -H "x-amz-acl: $S3_ACCESS_CONTROL" \
        -H "x-amz-storage-class: $storage_class" \
        -H "x-amz-date: ${date_time}" \
        -H "content-type: $CONTENT_TYPE" \
        -H "host: $S3_BUCKET_NAME.s3.amazonaws.com" \
        -H "Authorization: $auth_type Credential=$aws_key_id/$date/$region/$service/aws4_request, SignedHeaders=$signed_headers, Signature=$signature" \
        "$url"

    printf "\n\033[38;2;237;233;242mDone\033[0m\n"
}

main() {
    set -e
    validate_inputs "$@"
    upload_file_to_S3 "$@"
}

main "$@"
