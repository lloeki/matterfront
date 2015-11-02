# Matterfront

An application for [Mattermost](http://mattermost.org) for OS X, Windows, and Linux, powered by [Electron](http://electron.atom.io).

![screenshot on OS X](https://cloud.githubusercontent.com/assets/75445/10773661/f6ba012e-7cfc-11e5-9873-e685ea80c860.png)

## Installation

npm install matterfront

## Configuring

Configuration can be passed via your CLI, by simply passing in the host and team name as cli params:

    matterfront -H http://mattermost.example.com -T team-name

Including the team name is optional but makes things incredibly smoother if
you have disabled account creation and log in exclusively with GitLab SSO.

In the future, this will be settable from the UI.

## Testing

    npm test

## Building your own app

    npm build

## Name and affiliation

Matterfront is a **Matter**most **front**end application. This application is in no way affiliated with nor endorsed by Mattermost. See [Mattermost branding guidelines](http://www.mattermost.org/brand-guidelines/).
