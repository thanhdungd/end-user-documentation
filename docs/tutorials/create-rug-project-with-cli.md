Thus tutorial will guide you through the creation of a new, ready to run, Rug
project to host your handlers, editors and/or generators.

!!! note "Requirements"
    This tutorial assumes you have installed the [Rug CLI][ugcli] on your local
    machine.

[ugcli]: /user-guide/interfaces/cli/index.md

## Create a new Rug Project with the CLI

As anything that can be automated, Atomist tries its best to provide the 
appropriate Rugs, creating new [Rug projects][ugpj] is one of those scenarios.

[ugpj]: /user-guide/rug/projects.md

Here, you will be using the [NewStarterRugProject][starter] of the 
[rug-editors][rugeditors] project. This generator creates the skeleton of a Rug
project with good defaults, allowing you to crach up your own Rugs in no time.

[rugeditors]: https://github.com/atomist-rugs/rug-editors
[starter]: https://github.com/atomist-rugs/rug-editors#newstarterrugproject

Let's now create a new Rug project, called `awesome-rugs`,
on your local machine:

```console
$ cd ~/workspace
$ rug generate atomist-rugs:rug-editors:NewStarterRugProject awesome-rugs
Resolving dependencies for atomist-rugs:rug-editors (0.25.0·zip) completed
Loading atomist-rugs:rug-editors (0.25.0·zip) completed
TypeScript files added, run `cd .atomist && npm install`                                                                                                                                                         
found root node: Tag                                                                                                                                                                                             
Running generator NewStarterRugProject of atomist-rugs:rug-editors (0.25.0·zip) completed

→ Project
  ~/workspace/awesome-rugs/ (25 kb in 19 files)

→ Changes
  ├─┬ .atomist
  | ├── .gitignore
  | ├─┬ editors
  | | └── MyFirstEditor.ts
  | ├─┬ handlers/command
  | | └── MyFirstCommandHandler.ts
  | ├─┬ handlers/event
  | | └── MyFirstEventHandler.ts
  | ├── manifest.yml
  | ├── package.json
  | ├─┬ tests/handlers/command
  | | ├── MyFirstCommandHandlerSteps.ts
  | | └── MyFirstCommandHandlerTest.feature
  | ├─┬ tests/handlers/event
  | | ├── MyFirstEventHandlerSteps.ts
  | | └── MyFirstEventHandlerTest.feature
  | ├─┬ tests/project
  | | ├── MyFirstEditorSteps.ts
  | | └── MyFirstEditorTest.feature
  | └── tsconfig.json
  ├── .atomist.yml
  ├── CHANGELOG.md
  ├── CODE_OF_CONDUCT.md
  ├── LICENSE
  └── README.md

Successfully generated new project awesome-rugs
```

Tada! That's it, you have a working Rug project named `awesome-rugs` with
default editor, command and event handlers.

You can now add your own editors or handlers then test them and finally publish
this as an archive your team will be able to use. Push it to a repository in
your organisation and let others contribute to it.