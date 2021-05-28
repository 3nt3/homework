#!/bin/sh

sed -ri $(echo s/elm.compiled\(.\*\).js/elm.compiled.js/g) public/index.html

mv public/dist/elm.compiled* public/dist/elm.compiled.js || true
