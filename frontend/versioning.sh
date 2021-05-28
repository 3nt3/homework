#!/bin/sh

# get 8 random characters
suffix=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 8)

# replace elm.compiles.js with elm.compiled-$suffix.js
sed -ri $(echo s/elm.compiled\(.\*\).js/elm.compiled-$suffix.js/g) public/index.html

# remove all old versions
\rm public/dist/elm.compiled-*.js

# move the newly build elm.compiled.js to elm.compiled-$suffix.js
# this makes the browser not cache it between versions so you don't have to wait for caches to reload the file for new features to be
mv public/dist/elm.compiled.js $(echo public/dist/elm.compiled-$suffix.js)
