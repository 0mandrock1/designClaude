#!/usr/bin/env bash
# Build the React landing and copy its distributable output to the existing vhost.
set -euo pipefail

src="$(cd "$(dirname "$0")" && pwd)"
dst=/var/www/html/mandrock-landing

cd "$src"
npm run build
install -d -m 755 "$dst"
cp -R dist/. "$dst"/
printf 'deployed React build -> %s\n' "$dst"
