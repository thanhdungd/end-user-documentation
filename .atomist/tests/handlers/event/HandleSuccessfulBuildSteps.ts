import { Build } from "@atomist/cortex/stub/Build";
import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import { EventHandlerScenarioWorld, Given, Then,
         When } from "@atomist/rug/test/handler/Core";

const buildUrl = "http://ze-CI/build/90";

Given("the HandleSuccessfulBuild is registered",
    (world: EventHandlerScenarioWorld) => {
    world.registerHandler("HandleSuccessfulBuild");
});

When("a new Build is received", (world: EventHandlerScenarioWorld) => {
    const build: Build = new Build();
    build.withStatus("passed");
    build.withBuildUrl(buildUrl);
    build.withProvider("jenkins");

    world.sendEvent(build);
});

Then("the event handler should respond with a message", 
    (world: EventHandlerScenarioWorld) => {
    return world.plan().messages.length === 1;
});

Then("that message should be sent to the general channel",
    (world: EventHandlerScenarioWorld) => {
    const message: DirectedMessage = world.plan().messages[0] as DirectedMessage;
    return message.channelNames[0] === "general";
});

Then("that message should contain the link to the build",
    (world: EventHandlerScenarioWorld) => {
    const expected = `Build ${buildUrl} passed`;
    const message: DirectedMessage = world.plan().messages[0] as DirectedMessage;
    return message.body === expected;
});
