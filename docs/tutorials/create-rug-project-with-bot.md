Atomist helps you automate common, repetitive development tasks. It does 
this using programs called Rugs. Sometimes Atomist already has Rugs that 
do what you want, and sometimes you need to write your own.

In this tutorial you'll use the Atomist bot to create a new Rug project 
with default settings. When you finish, you'll be ready to add
logic to your Rug so that it performs the task you want to automate.

Of course, creating a Rug project is itself a routine task - exactly the
kind of job Atomist was designed to automate. Like a robot 
that builds other robots, Atomist has a Rug that creates Rug projects. 

!!! note "Requirements"
    This tutorial assumes you followed the getting-started procedures
    to hook Atomist into your development landscape, including your CI
    provider. It also assumes you installed the [Rug CLI][ugcli].

[ugpxe]: /user-guide/rug/path-expressions.md
[ugcli]: /user-guide/interfaces/cli/index.md

## Create a new Rug Project with the Bot

Atomist provides a set of generators and editors to work with Rug projects
in its [rug-editors][rugeditors] project. Those are always available to your
team.

[rugeditors]: https://github.com/atomist-rugs/rug-editors

Start by searching for generators that can create a new Rug project:

```
@atomist generators starter
```

This command asks the Atomist bot to list all generators that are tagged with
the `starter` label.

The returned generator is 
[atomist-rugs:rug-editors:NewStarterRugProject][starterproj].
This is its fully-qualified name. Its short name is `NewStarterRugProject` and
that's how we love it.

[starterproj]: https://github.com/atomist-rugs/rug-editors#newstarterrugproject

Click the `Generate project` button. The Atomist bot opens a new thread
asking you to name your new Rug project. This name is used both to create
a new channel in your team as well as the name of the repository in your
organisation. Next, either click the `Generate project` button to submit, or 
click `Cancel` to stop the current operation.

Once you create the project, the bot informs you it is going to
perform the requested command. Shortly after, it notifies you the operation
has completed with a link to your new project's repository. Notice also, a new 
channel named after your project has been created.

That's it! Now, you can clone your new project and start adding new Rugs such
as editors to automate common tasks, skills to extend the Atomist bot or even
handlers to react to your ecosystem lifecycle's events.

