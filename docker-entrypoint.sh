#!/bin/sh
set -e

: "${API_URL:?API_URL environment variable is required}"

envsubst '$API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
