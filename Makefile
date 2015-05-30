all: build minify headerify

build:
	@browserify lib/index.js --standalone progenitor > progenitor.js

minify:
	@uglifyjs progenitor.js --compress --mangle --stats --output progenitor.min.js --source-map progenitor.min.js.map

headerify:
	@cat ./lib/header.js
	@cat ./lib/header.js > tmp.js && cat progenitor.js >> tmp.js && mv tmp.js progenitor.js
	@cat ./lib/header.js > tmp.js && cat progenitor.min.js >> tmp.js && mv tmp.js progenitor.min.js

clean:
	@rm progenitor.js progenitor.min.js progenitor.min.js.map

test:
	([ -e ./node_modules/.bin/minijasminenode2 ] && ./node_modules/.bin/minijasminenode2 --verbose --forceexit **/*_spec.js) || (printf "\nMini Jasmine not installed @ ./node_modules/.bin/minijasminenode2...\n\nTrying npm install\n\n" && npm install)
