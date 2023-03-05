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

upload_to_s3() {
    if [ "$1" = "" ]; then
        echo "missing file path"
        return 1
    fi

    file_path=$1
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
        "https://$S3_BUCKET.s3.amazonaws.com$S3_BUCKET_PATH$file_name"
}

main() {
    echo "starting task to upload resume assets to S3 bucket '$S3_BUCKET'..."

    target_directory="./resume/out"
    set -e

    for file_path in "$target_directory"/*; do
        echo "uploading file '$file_path' to S3 bucket '$S3_BUCKET'..."
        upload_to_s3 "$file_path"
    done

    echo "done"
}

main
