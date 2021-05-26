#!/bin/sh

# get 8 random characters
suffix=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 8)

sed -ri $(echo s/elm.compiled\(.\*\).js/elm.compiled-$suffix.js/g) public/index.html

mv public/dist/elm.compiled.js $(echo public/dist/elm.compiled-$suffix.js)
