# Matterfront

An application for [Mattermost](http://mattermost.org) for OS X, Windows, and Linux, powered by [Electron](http://electron.atom.io).

![screenshot on OS X](https://cloud.githubusercontent.com/assets/75445/10773661/f6ba012e-7cfc-11e5-9873-e685ea80c860.png)

## Installation

First, clone down this project, and then from within that directory in your favorite terminal run:

```
>  npm install
// installs packages....
> npm link
// creates a local symlink
```
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

## Name and affiliation

Matterfront is a **Matter**most **front**end application. This application is in no way affiliated with nor endorsed by Mattermost. See [Mattermost branding guidelines](http://www.mattermost.org/brand-guidelines/).
