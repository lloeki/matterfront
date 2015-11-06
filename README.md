# Matterfront

An application for [Mattermost](http://mattermost.org) for OS X, Windows, and Linux, powered by [Electron](http://electron.atom.io).

![screenshot on OS X](https://cloud.githubusercontent.com/assets/75445/10773661/f6ba012e-7cfc-11e5-9873-e685ea80c860.png)

## Installation

First, clone down this project, and then from within that directory in your favorite terminal run:

  >  npm install 
  // installs packages....
  > npm link
  // creates a local symlink

You're now ready to start developing against your local mattermost installation. Make sure
you have your `config.json` setup as noted in the steps below.

## Configuring

Create a `config.json` file in the `/src` directory. It should look like this:


```json
{
    "url": "https://mattermost.example.com/team-name"
}
```

Including the team name is optional but makes things incredibly smoother if
you have disabled account creation and log in exclusively with GitLab SSO.

In the future, this will be settable from the UI.

## Testing

    npm start

## Building your own app

First follow the install instrustions above. Then from within your project root,
you can build for all platforms and distributions by running:

    npm run build

This will output the following into the `/dist` directory:

```
drwxr-xr-x  ... matterfront-darwin-x64
drwxr-xr-x  ... matterfront-linux-ia32
drwxr-xr-x  ... matterfront-linux-x64
drwxr-xr-x  ... matterfront-win32-ia32
drwxr-xr-x  ... matterfront-win32-x64
```

Each directory contains an executable for the platform listed. For more detailed 
build options, check out how to modify your `build` from within `package.json` by
using the options from [electron-packager](https://github.com/maxogden/electron-packager#usage) to modify your built artifacts.
## Name and affiliation

Matterfront is a **Matter**most **front**end application. This application is in no way affiliated with nor endorsed by Mattermost. See [Mattermost branding guidelines](http://www.mattermost.org/brand-guidelines/).
