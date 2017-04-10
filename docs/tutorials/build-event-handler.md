Reacting to what is happening, in your development and operational
environments, is a key aspect of your daily job. You may already have setup 
alerts in various venues to get notified. Atomist unifies those
event into an smooth and actionable set of notifications.

To support this feature, you must define an event handler which allows you
define a behavior on certain events, e.g. warn the team when a new build
has completed, or maybe when another team has released a new version of their
service you are depending on. 

### Add an Event Handler to a Rug Project

Event handlers live the `.atomist/handlers/event` directory of a Rug project.
Assuming you already have a Rug project, let's use Atomist to add the 
skeleton of an event handler to that project:

```
@atomist editors
```

<div class="ss-container">
  <img src="../images/add-event-handler-ask-bot-editor.png" alt="Ask bot for editors to add event handler" class="ss-small">
</div>

The editor you will be using is the `AddTypeScriptEventHandler` from 
the `atomist-rugs:rug-editors` Rug archive Atomist provides to all teams.
Click on the `Edit project` button. This will start a new thread on the side
where Atomist will ask you for information regarding your new event handler.

<div class="ss-container">
  <img src="../images/add-event-handler-to-project.png" alt="Fill editor parameter to add event handler" class="ss-small">
</div>

Notice how some of the parameters are set by default for you, notably the 
`pathExpression` parameter which is set to `/Tag()`. This means your event
handler will react to any notifications on project's tags.

!!! seealso
    In this tutorial, we will not extensively cover path expressions. Please
    refer to the [path expressions user-guide][ugpxe] to dive into that subject.

[ugpxe]: /user-guide/rug/path-expressions.md

The bot informs you now that the operation succeeded:

<div class="ss-container">
  <img src="../images/add-event-handler-to-project-confirmed.png" alt="Add class editor to Project confirmed" class="ss-small">
</div>

Go to your GitHub project and browse for pull-requests, you will see a new one 
for the edition the bot just performed on your behalf.

<div class="ss-container">
  <img src="../images/add-event-handler-to-project-PR.png" alt="PR to add an event handler to your project" class="ss-small">
</div>

The changes brought by Atomist contains an event handler skeleton along with
a test for it. Go ahead and merge the pull-request in your master branch. Next 
delete the branch as it is not needed any longer.

!!! success
    Once you have reviewed and merged that PR into your master branch, Atomist
    will react an event in your channel informing you of what just happened. In
    effect, you see the premise of your own event handler workflow.

    <div class="ss-container">
    <img src="../images/add-event-handler-to-project-PR-merged.png" alt="Event of the PR merge" class="ss-small">
    </div>

Now, you are going to learn how to edit and test your new event handler.

### Edit and Test Your Event Handler

Altough event handlers deal with notifications of what is happening on your
system, they still remain functions that need to be developed and test locallly
like any other Rugs. To achieve this, you must have the [rug CLI][cli]
installed and ready to go.

[cli]: /user-guide/interfaces/cli/index.md

Pull the latest changes from your remote master branch to fetch the changes
you have just merged.

The first thing you are going to do is run the test for your event handler:

```console
$ rug test MyEventCatcherTest.feature
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/handlers/event/MyEventCatcher.ts succeeded
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/tests/handlers/event/MyEventCatcherSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Running test feature MyEventCatcher handler handles events
  Running test scenario Executing a sample event handler
  Completed test scenario Executing a sample event handler passed
Completed test feature MyEventCatcher handler handles events passed
Running tests in atomist-project-templates:sylvaintest4 (0.1.0·local) completed

Successfully executed 1 of 1 test: Test SUCCESS
```

Good, the test runs so you know where you are starting from. Let's have a look
at the event handler itself:

```typescript
import { HandleEvent, Message, Plan } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { Tag } from "@atomist/cortex/stub/Tag";

@EventHandler("MyEventCatcher", "catches stuff", "/Tag()")
@Tags("documentation")
export class MyEventCatcher implements HandleEvent<Tag, Tag> {
    handle(event: Match<Tag, Tag>): Plan {
        let root: Tag = event.root();
        let plan: Plan = new Plan();
        let message = new Message(`${root.nodeName()} event: ${root.name()}`);
        message.withNode(root)
        return plan.add(message);
    }
}

export const myEventCatcher = new MyEventCatcher();
```

As you can see, the parameter you provided to the editor were used to define
your event handler. Notably, the path expression matching also the TypeScript
type `#!typescript Tag`. The instance that matched is retrieved via the 
`#!typescript event.root()` call.

The event handler defines a single message plan, populated with the tag that
matched the path expression. That plan will be executed asynchronously by
Atomist and the message will be dispatched to the project's channel.

All event handlers share the same pattern, you define what you are interested
in matching and then you return a plan instructing what operations should be
carried.

!!! seealso
    Please read the [event handlers user-guide][ugeh] for a deep dive into the 
    programming model of event handlers. In particular, a plan can be made of
    multiple instructions, not just messages.

[ugeh]: /user-guide/rug/handlers.md

Now that you have a running, and tested, event handler, it's time for you to
publish it to make it available to your team.

### Publish your Event Handler

Your event handler is tested and running locally, time to ship it to Atomist
so your team can benefit from it. To do, run the publish command as follows:

```console
rug publish
Resolving dependencies for atomist-project-templates:sylvaintest4 (0.1.0·local) completed
Invoking TypeScript Compiler on .ts files
  Compiled .atomist/handlers/event/MyEventCatcher.ts succeeded
  Compiled .atomist/tests/project/AddJavaClassSteps.ts succeeded
  Compiled .atomist/tests/handlers/event/MyEventCatcherSteps.ts succeeded
  Compiled .atomist/editors/AddJavaClass.ts succeeded
Invoking compilers on project sources completed
Loading atomist-project-templates:sylvaintest4 (0.1.0·local) completed
  Created META-INF/maven/atomist-project-templates/sylvaintest4/pom.xml
  Created .atomist/manifest.yml
  Created .atomist/metadata.json
Generating archive metadata completed
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.zip → t1fbr1ctw (573 kb) succeeded
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.pom → t1fbr1ctw (641 bytes) succeeded
  Uploading atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0-metadata.json → t1fbr1ctw (1 kb) succeeded
  Downloading atomist-project-templates/sylvaintest4/maven-metadata.xml ← t1fbr1ctw (392 bytes) succeeded
  Uploading atomist-project-templates/sylvaintest4/maven-metadata.xml → t1fbr1ctw (344 bytes) succeeded         
Publishing archive into remote repository completed

→ Archive
  ~/dev/atomist/alpha/sylvaintest4/.atomist/target/sylvaintest4-0.1.0.zip (573 kb in 363 files)

→ URL
  https://atomist.jfrog.io/atomist/T1FBR1CTW/atomist-project-templates/sylvaintest4/0.1.0/sylvaintest4-0.1.0.zip

Successfully published archive for atomist-project-templates:sylvaintest4 (0.1.0)
```

The publish command packaged up your entire Rug project into an archive that
it uploaded to the repository tied to your team. You can now benefit from your
new handler by tagging one of your project and see how this event triggers the
event handler and its response.

