SRC = src/main.js src/menu.js src/index.html src/load-src.js src/webview.js src/package.json src/config.json
RES = resources/*

all: dist

node_modules/electron-prebuilt:
	npm install electron-prebuilt@0.34 --save-dev

node_modules/electron-packager:
	npm install electron-packager --save-dev

electrify: node_modules/electron-prebuilt node_modules/electron-packager

run:
	./node_modules/.bin/electron src

dist/Matterfront-darwin-x64/Matterfront.app: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Matterfront --platform=darwin --arch=x64 --version=0.34.2 --out=dist --icon=resources/mattermost --app-bundle-id=org.matterfront.app --app-version=0.1.0 --helper-bundle-id=org.matterfront.app.helper --asar --overwrite

dist/Matterfront-win32-x64/Matterfront.exe: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Matterfront --platform=win32 --arch=x64 --version=0.34.2 --out=dist --icon=resources/mattermost --app-version=0.1.0 --asar --overwrite

dist/Matterfront-win32-ia32/Matterfront.exe: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Matterfront --platform=win32 --arch=ia32 --version=0.34.2 --out=dist --icon=resources/mattermost --app-version=0.1.0 --asar --overwrite

dist/Matterfront-linux-x64/Matterfront: $(SRC) $(RES)
	mkdir -p dist
	node_modules/.bin/electron-packager src Matterfront --platform=linux --arch=x64 --version=0.34.2 --out=dist --icon=resources/mattermost --app-version=0.1.0 --asar --overwrite

dist: electrify dist/Matterfront-darwin-x64/Matterfront.app dist/Matterfront-win32-x64/Matterfront.exe dist/Matterfront-win32-ia32/Matterfront.exe dist/Matterfront-linux-x64/Matterfront

dist/Matterfront-darwin-x64.zip: dist/Matterfront-darwin-x64
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

dist/Matterfront-win32-x64.zip: dist/Matterfront-win32-x64
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

dist/Matterfront-win32-ia32.zip: dist/Matterfront-win32-ia32
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

dist/Matterfront-linux-x64.zip: dist/Matterfront-linux-x64
	cd $(dir $@); zip -r $(notdir $@) $(notdir $^)

zip: dist/Matterfront-darwin-x64.zip dist/Matterfront-win32-x64.zip dist/Matterfront-linux-x64.zip

install: dist/Matterfront-darwin-x64
	rm -rf /Applications/Matterfront.app
	ditto dist/Matterfront-darwin-x64/Matterfront.app /Applications/Matterfront.app

clean:
	rm -rf dist/*

.PHONY: dist zip electrify run all clean install
