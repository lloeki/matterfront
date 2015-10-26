SRC = src/main.js src/menu.js src/index.html src/package.json src/config.json
RES = resources/*

all: dist

node_modules/electron-prebuilt:
	npm install electron-prebuilt@0.34 --save-dev

node_modules/electron-packager:
	npm install electron-packager --save-dev

electrify: node_modules/electron-prebuilt node_modules/electron-packager

run:
	./node_modules/.bin/electron src

dist/Mattermost-darwin-x64/Mattermost.app: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Mattermost --platform=darwin --arch=x64 --version=0.34.1 --out=dist --icon=resources/mattermost --app-bundle-id=org.mattermost.app --app-version=0.1.0 --helper-bundle-id=org.mattermost.app.helper --asar --overwrite

dist/Mattermost-win32-x64/Mattermost.exe: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Mattermost --platform=win32 --arch=x64 --version=0.34.1 --out=dist --icon=resources/mattermost --app-version=0.1.0 --asar --overwrite

dist: electrify dist/Mattermost-darwin-x64/Mattermost.app dist/Mattermost-win32-x64/Mattermost.exe

dist/Mattermost-darwin-x64.zip: dist/Mattermost-darwin-x64
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

dist/Mattermost-win32-x64.zip: dist/Mattermost-win32-x64
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

zip: dist/Mattermost-darwin-x64.zip dist/Mattermost-win32-x64.zip

install: dist/Mattermost-darwin-x64
	rm -rf /Applications/Mattermost.app
	ditto dist/Mattermost-darwin-x64/Mattermost.app /Applications/Mattermost.app

clean:
	rm -rf dist/*

.PHONY: dist zip electrify run all clean install
