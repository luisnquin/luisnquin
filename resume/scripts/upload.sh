#!/bin/sh

export LANG=es_ES.UTF-8

if [ "$AWS_ACCESS_KEY" = "" ]; then
    if [ "$AWS_ACCESS_SECRET" = "" ]; then
        echo "missing AWS Access Key and Secret"
    else
        echo "missing AWS Access Key"
    fi

    exit 1
elif [ "$AWS_ACCESS_SECRET" = "" ]; then
    echo "missing AWS Access Secret"
    exit 1
elif [ "$S3_BUCKET" = "" ]; then
    echo "missing environment variable 'BUCKET'"
    exit 1
elif [ "$S3_ACL" = "" ]; then
    echo "missing environment variable 'ACL'"
    exit 1
fi

delete_from_s3() {
    if [ "$1" = "" ]; then
        echo "missing path"
        return 1
    fi

    path=$1

    date_header="x-amz-date:$(date -R)"

    sig_string="DELETE\n\n\n\n$date_header\n/$S3_BUCKET$path"
    signature=$(printf "$sig_string" | openssl sha1 -hmac "$AWS_ACCESS_SECRET" -binary | base64)

    curl -f -X DELETE \
        -H "Authorization: AWS ${AWS_ACCESS_KEY}:$signature" \
        -H "User-Agent: dotnet" \
        -H "$date_header" \
        -H "Host: $S3_BUCKET.s3.amazonaws.com" \
        "https://$S3_BUCKET.s3.amazonaws.com$path"
}

upload_to_s3() {
    if [ "$2" = "" ]; then
        echo "missing file path"
        return 1
    fi

    target_directory=$1
    file_path=$2

    file_name="$(basename "$file_path")"

    storage_class="x-amz-storage-class:STANDARD"
    content_type=$(file -b --mime-type "$file_path")
    date=$(date -R)

    sig_string="PUT\n\n$content_type\n$date\n$S3_ACL\n$storage_class\n/$S3_BUCKET$S3_BUCKET_PATH$file_name"
    signature=$(printf "$sig_string" | openssl sha1 -hmac "$AWS_ACCESS_SECRET" -binary | base64)

    curl -f -X PUT -T "$file_path" \
        -H "Authorization: AWS ${AWS_ACCESS_KEY}:$signature" \
        -H "Host: $S3_BUCKET.s3.amazonaws.com" \
        -H "Content-Type: $content_type" \
        -H "Date: $date" \
        -H "$S3_ACL" \
        -H "$storage_class" \
        "https://$S3_BUCKET.s3.amazonaws.com$target_directory$file_name"
}

main() {
    echo "starting task to upload resume assets to S3 bucket '$S3_BUCKET'..."

    target_directory="./resume/build/outputs"
    set -e

    echo "cleaning '$S3_BUCKET_PATH' S3 directory..."

    # TODO: list objects request
    # Ref: https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html
    delete_from_s3 "${S3_BUCKET_PATH}luis-quinones.pdf"
    delete_from_s3 "${S3_BUCKET_PATH}luis-quinones.png"

    for file_path in "$target_directory"/*; do
        echo "uploading file '$file_path' to S3 bucket '$S3_BUCKET'..."
        upload_to_s3 "$S3_BUCKET_PATH" "$file_path"
    done

    echo "done"
}

main
