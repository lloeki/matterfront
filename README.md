[![Build Status](https://travis-ci.org/HackerHappyHour/matterfront.svg)](https://travis-ci.org/HackerHappyHour/matterfront)

# Matterfront

**This application is *deprecated* in favor of the [official one](https://github.com/mattermost/desktop)**

An application for [Mattermost](http://mattermost.org) for OS X, Windows, and Linux, powered by [Electron](http://electron.atom.io).

![screenshot on OS X](https://cloud.githubusercontent.com/assets/75445/10773661/f6ba012e-7cfc-11e5-9873-e685ea80c860.png)

## Installation

First, clone down this project, and then from within that directory in your favorite terminal run:

```
> npm install
// installs packages....
> npm link
// creates a local symlink
```
You're now ready to start developing against your local mattermost installation. Make sure
you have your `config.json` setup as noted in the steps below.

## Connecting to your teams

Matterfront can connect to multiple teams. For now, the names and urls or your teams are pulled from a json file in your home directory.

Create a text file at `~/.matterfront/config.json`. (Where `~` is your home directory). Make it look like this:

```json
{
  "teams": [{
    "name": "team1",
    "url": "http://some.server.com/team1"
  },{
    "name": "team2",
    "url": "http://some.server.com/team2"
  }]
}
```

Note: each team must have a unique name specified in the config.

You should be able to provide your credentials when the mattermost page loads the first time.

Support for adding multiple teams through the UI is coming soon.

## Electron and Chrome command-line args

[Electron supports a subset of Chrome command-line switches](https://github.com/atom/electron/blob/master/docs/api/chrome-command-line-switches.md) when it starts up the main Chromium window. These command-line switches can be set via a config file in your home dir.

Create a text file at `~/.matterfront/config.json`. (Where `~` is your home directory), and include a `chrome-args` key, like this:

```json
{
  "chrome-args": {
    "remote-debugging-port":"2929",
    "no-proxy-server": ""
  }
}
```

Matterfront will read this file and apply each switch when it starts up the app. Note that config options that don't have a value can specify a value of `""`.

These values can also be specified via the developer command-line like this:

```
electron . --chrome-args:remote-debugging-port=2929 --chrome-args:no-proxy-server
```

## Enabling the tray icon

Matterfront can show an icon in the tray, which is the notification area on Windows, or menu bar on OS X. To enable the tray icon, set the option `showTrayIcon` in your `config.json`, like this:

```json
{
  "showTrayIcon": true
}
```

If the tray icon is enabled, Matterfront will not quit when the window is closed. Quit the process using the corresponding menu item of the tray icon.

## Running in Developer Mode

To launch the app from source without building a distribution:

```
npm run start
```

To launch the app in watch mode:

```
npm run start-watch
```

While running in watch mode, any code changes will automatically be reflected in the running app as files are saved. If main process code changes, the whole app will restart. If browser-side code changes, the browser window will reload. Check out `./electron-watch.js` for details.

Other dev tasks are also available as both "run-once" and "watch". Check out the `package.json` `scripts` block for details.

## Testing

This project contains a [Vagrant](https://vagrantup.com) environment, consisting of
a locally hostable mattermost instance you can use for testing. Alternatively, you can use your own production mattermost server.

### Use your production Mattermost instance

After following the configuration steps above, run `npm start` from within your matterfront directory

### Vagrant method

1. Set up your `config.json` using `"url":"http://192.168.33.33"`
2. run `vagrant up` from within your local
copy of this repo
3. run `npm start`

## Building your own app

First follow the install instructions above. Then from within your project root,
you can build for all platforms and distributions by running:

    npm run build

This will output the following distributions into the `/dist` directory:

```
dist/
 |- matterfront-darwin-x64/
 |- matterfront-linux-ia32/
 |- matterfront-linux-x64/
 |- matterfront-win32-ia32/
 |- matterfront-win32-x64/
```

Each directory contains an executable for the platform listed. For more detailed
build options, check out how to modify your `build` from within `package.json` by
using the options from [electron-packager](https://github.com/maxogden/electron-packager#usage) to modify your built artifacts.

If you are on Linux or OS X, you need Wine [for Windows builds](https://github.com/maxogden/electron-packager#building-windows-apps-from-non-windows-platforms).

## Name and affiliation

Matterfront is a **Matter**most **front**end application. This application is in no way affiliated with nor endorsed by Mattermost. See [Mattermost branding guidelines](http://www.mattermost.org/brand-guidelines/).
