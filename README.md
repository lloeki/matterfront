# Matterfront

An application for [Mattermost](https://mattermost.org) for OS X, Windows, and Linux, powered by [Electron](https://electron.atom.io).

![screenshot on OS X](https://cloud.githubusercontent.com/assets/75445/10773661/f6ba012e-7cfc-11e5-9873-e685ea80c860.png)

## Configuring

Create a `config.json` file in the relevant directory for your platform:

- `~/Library/Application Support/Mattermost` on OS X
- `%APPDATA%/Mattermost` on Windows
- `~/.config/Mattermost` on Linux

Make it look like this:

```json
{
    "url": "https://mattermost.example.com/team-name"
}
```

Including the team name is optional but makes things incredibly smoother if
you have disabled account creation and log in exclusively with GitLab SSO.

In the future, this will be settable from the UI.

## Testing

Place a `config.json` at the root of this project and execute `make run`.

## Building your own app

This is useful to distribute the application preconfigured inside your company.

- place `config.json` inside `src`
- execute `make dist`
- optionally, `make zip` will compress the files for you.

In the future, doing this will lock the app into using only the configured URL.

## Name and affiliation

Matterfront is a **Matter**most **front**end application. This application is in no way affiliated with nor endorsed by Mattermost. See [Mattermost branding guidelines](http://www.mattermost.org/brand-guidelines/).
