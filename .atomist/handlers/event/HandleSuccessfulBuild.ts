import { Build } from "@atomist/cortex/stub/Build";
import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import { ChannelAddress, DirectedMessage, HandleEvent,
         Plan } from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";
import * as query from "@atomist/rugs/util/tree/QueryByExample";

@EventHandler("HandleSuccessfulBuild", "respond to successful build events",
              query.byExample(new Build().withStatus("passed")))
@Tags("build")
export class HandleSuccessfulBuild implements HandleEvent<Build, Build> {
    handle(event: Match<Build, Build>): Plan {

        // access the matched event
        const build: Build = event.root();

        // prepare the message to send to the #general channel
        const message = new DirectedMessage(
            `Build ${build.buildUrl} passed`,
            new ChannelAddress("general"));

        // instruct Atomist to process that message as soon as possible
        return Plan.ofMessage(message);
    }
}

export const handleSuccessfulBuild = new HandleSuccessfulBuild();
