# Contributors Reference Guide to Matterfront

The `bin/matterfront` file is the entry-point for the *Matterfront cli*. This file
initializes the cli, by loading `/lib/cli.js`.

The `/lib/cli.js` file reads each file under the `/lib/commands` directory, and
then adds that file onto the cli's interface. This means if you want to build
your own version of *Matterfront*, with additional cli commands and options,
you just have to create a new command file under `/lib/commands/[custom].js`

The `/lib/utils` folder will contain actionable node modules, and are agnostic
to both the cli and the UI, as they should be able to be leveraged from either.

Both the UI and CLI api's interfaces have been writting with accompanying [jsdoc][]
formatted comments, and these docs can be auto-assembled to `/docs/contrib-guide`
as a markdown file, creating a new guide file for each file in a heirarchical
structure matching the structure underneath `/lib`.

If you wish to contribute, please follow this pattern, and make sure to run
`matterfront-docgen` prior to submitting a merge request.

[jsdoc]: http://usejsdoc.org/
