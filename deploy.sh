#!/usr/bin/env bash
# Build the React landing and copy its distributable output to the existing vhost.
set -euo pipefail

src="$(cd "$(dirname "$0")" && pwd)"
# nginx (sites-available/mandrock-me.conf, root for mandrock.me/www) serves
# from /var/www/html/_apps/mandrock-landing — /var/www/html/mandrock-landing
# doesn't exist and was never the live root, this was a stale path.
dst=/var/www/html/_apps/mandrock-landing

cd "$src"
npm run build
install -d -m 755 "$dst"
cp -R dist/. "$dst"/
printf 'deployed React build -> %s\n' "$dst"
