#!/usr/bin/env sh

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR/www.soncresity.industries" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm i --force
fi

npm run dev