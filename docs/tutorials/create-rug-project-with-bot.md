Atomist aims at helping you perform common and repeatitive tasks. Creating a 
Rug project is such a boring task Atomist automates for you.

In this tutorial, you will learn how to create a new Rug project with default
settings for you to focus on the actual logic you need to automate.

!!! note "Requirements"
    This tutorial assumes you have followed the getting-started procedures
    to hook Atomist with your ecosystem, including obviously your CI
    provider. It also assumes you have installed the [Rug CLI][ugcli].

[ugpxe]: /user-guide/rug/path-expressions.md
[ugcli]: /user-guide/interfaces/cli/index.md

## Create a new Rug Project with the Bot

Atomist provides a set of generators and editors to work against Rug project
in its [rug-editors][rugeditors] project. Those are always available to your
team.

[rugeditors]: https://github.com/atomist-rugs/rug-editors

Let's search for the generator that can create a new Rug project for us:

```
@atomist generators starter
```

This kindly asks the Atomist bot to list generators that are tagged with
the `starter` label.

The returned generator is 
[atomist-rugs:rug-editors:NewStarterRugProject][starterproj].
This is its fully-qualified name. Its short name is `NewStarterRugProject` and
that's how we love it.

[starterproj]: https://github.com/atomist-rugs/rug-editors#newstarterrugproject

Click on the `Generate project` button. The Atomist bot opens a new thread
asking you the name of the new Rug project. This name is used both to create
a new channel in your team as well as the name of the repository in your
organisation. Next, either click the `Generate project` button to submit, or 
click `Cancel` to stop the current operation.

Assuming you go ahead and create the project, the bot informs you it is going to
perform the requested command. Shortly after, it notifies you the operation
has completed with a link to your new project's repository. Notice also, a new 
channel named after your project has been created.

That's it! Now, you can clone your new project and start adding new Rugs such
as editors to automate common tasks, skills to extend the Atomist bot or even
handlers to react to your ecosystem lifecycle's events.

