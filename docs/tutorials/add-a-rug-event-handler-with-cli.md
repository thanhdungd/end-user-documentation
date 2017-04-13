This tutorial teaches you how to add an event handler, which allows Atomist to 
take action when something happens in your development lifecycle.

!!! note "Requirements"
    This tutorial assumes you have installed the [Rug CLI][ugcli] on your local
    machine.

[ugcli]: /user-guide/interfaces/cli/index.md

## Add a Rug Event Handler to your Rug Project

Atomist provides the [AddTypeScriptEventHandler editor][addevh] to add a Rug 
event handler in one swift call.

[addevh]: https://github.com/atomist-rugs/rug-editors#addtypescripteventhandler

This editor should be run from the top-level directory of your Rug project. It
will add the event handler TypeScript file as well as a BDD-style test for that
handler. 

Let's apply this editor to create an event handler that will match your CI
build events:

```console
$ cd ~/workspace/awesome-rugs
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEventHandler \
    handlerName=HandleSuccessfulBuild\
    description="respond to successful build events"\
    pathExpression="/Build()"
Resolving dependencies for atomist-rugs:rug-editors (0.25.0·zip) completed
Loading atomist-rugs:rug-editors (0.25.0·zip) completed
found root node: Build                                                                                                                                                                                           
Running editor AddTypeScriptEventHandler of atomist-rugs:rug-editors (0.25.0·zip) completed

→ Project
  ~/workspace/awesome-rugs/ (25 kb in 22 files)

→ Changes
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts created (890 bytes)
  ├── .atomist/tests/handlers/event/HandleSuccessfulBuildSteps.ts created (944 bytes)
  ├── .atomist/tests/handlers/event/HandleSuccessfulBuildTest.feature created (365 bytes)
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts updated (828 bytes)
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts updated (825 bytes)
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts updated (824 bytes)
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts updated (826 bytes)
  ├── .atomist/handlers/event/HandleSuccessfulBuild.ts updated (840 bytes)
  ├── .atomist/tests/handlers/event/HandleSuccessfulBuildSteps.ts updated (942 bytes)
  ├── .atomist/tests/handlers/event/HandleSuccessfulBuildTest.feature updated (362 bytes)
  └── .atomist.yml created (686 bytes)

Successfully edited project awesome-rugs
```

Done! Atomist added the appropriate files to your Rug project and you can 
edit them to [respond to build events][editevh] for example.

[editevh]: send-message-on-build.md
