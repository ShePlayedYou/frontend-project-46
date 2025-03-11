install: 
	npm ci

package-install:
	sudo npm link

package-uninstall:
	sudo npm unlink -g @hexlet/code

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test