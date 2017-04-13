Atomist routes relevant information about your development pipeline to 
the right place at the right time. In this tutorial, you'll learn how to 
instruct Atomist to return different messages when a build succeeds or fails.

!!! note "Requirements"
    This tutorial assumes you have followed the getting-started procedures
    to hook Atomist with your development landscape, including your CI
    provider. It also assumes you have installed the [Rug CLI][ugcli].

[ugevh]: /user-guide/rug/handlers.md
[ugpxe]: /user-guide/rug/path-expressions.md
[ugcli]: /user-guide/interfaces/cli/index.md

!!! tip "Get the code!"
    Find the code in this tutorial in the 
    [documentation repository][docrug].

[docrug]: https://github.com/atomist/end-user-documentation/tree/master/.atomist

## A Rug for successful build events

A Rug event handler has two parts:

* A [path expression][ugpxe] that Atomist uses to match an event
* The logic of the [event handler][ugevh] for the matched event

Let's look at a Rug event handler for build events: 

```typescript linenums="1"
{!../../.atomist/handlers/event/HandleSuccessfulBuild.ts!}
```

Once the right Atomist types are imported, we declare an event handler to
match build events that have the status property set to `"passed"` (line 8).
Next, we define the logic of our handler in such an event by simply returning
a message directed to the `#general` channel of your team.

You can create different event handlers for the various statuses
a build event can have: `"passed"`, `"broken"`, `"failed"` or `"started"`.

Atomist allows you to discriminate between different build providers. For example, 
you can restrict this build handler so that it only matches Jenkins build events
by modifying your path expression as follows:

```typescript
query.byExample(new Build().withProvider("jenkins").withStatus("passed"))
```

!!! seealso
    Refer to the [user guide][ugevh] for a more detailed tour of event handlers.

## Test your Rug

It's a good idea to test your handler during development with a simple
[BDD-style test][ugtest] as follows:

```gherkin
{!../../.atomist/tests/handlers/event/HandleSuccessfulBuildTest.feature!}
```

This scenario is implemented as follows:

```typescript
{!../../.atomist/tests/handlers/event/HandleSuccessfulBuildSteps.ts!}
```

[ugtest]: /user-guide/rug/tests.md

Those files are located in 
`.atomist/tests/handlers/event/HandleSuccessfulBuildTest.feature` and 
`.atomist/tests/handlers/event/HandleSuccessfulBuildSteps.ts` respectively. 

Execute your test with the following command:

```console
$ rug test HandleSuccessfulBuildTest.feature
```

!!! seealso
    Refer to the [user guide][ugtest] for more information regarding
    the Rug testing support.

## Publish your Rug to your team

You can now [publish][ugpub] your new Rug event handler to your team. Enjoy your
new build messages!

[ugpub]: /user-guide/rug/lifecycle.md#publishing
