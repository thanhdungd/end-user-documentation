## Rug Conventions & Best Practices

Rug *is* the Atomist programming model in [TypeScript][ts]. Rug is 
currently used  to define project [generators](rug-generators.md), 
[editors](rug-editors.md), reviewers (coming soon), and [tests](rug-tests.md).

[ts]: https://www.typescriptlang.org/
[rug]: https://github.com/atomist/rug
[tsdecorator]: https://www.typescriptlang.org/docs/handbook/decorators.html

As with any language and environment, there is a set of idioms and
common practices that will turn your Rug from `nice` to `great` (and
in some contexts from ***not working*** to
***working***). Collectively these are the _Rug Conventions_.

### Exemplar

The [atomist/travis-editors][travis-editors] Rug repository is
a good example repository.  We strive to keep that repository up to
date with these conventions.  It has good documentation and examples.  
When going through the conventions below, we encourage you to reference that 
repository for concrete examples.

[travis-editors]: https://github.com/atomist-rugs/travis-editors

### Rug Projects

A _Rug project_ is simply any project that contains a conforming
`.atomist` directory and a `manifest.yml` description of the project. A minimal
 directory layout would only contain:

```
.atomist/
  manifest.yml
  package.json
```

A fuller example directory layout for a larger collection of Rug artifacts would 
be:

```
.atomist/
  editors/
  handlers/
  reviewers/
  templates/
  tests/
  manifest.yml
  package.json
```

The `manifest.yml` file should contain the following general information and 
formatting:

```yaml
group: atomist-rugs
artifact: travis-editors
version: "0.12.2"
requires: "[0.11.0,1.0.0)"
dependencies:
extensions:
```

The `package.json` file is a typical [npm description][npmpkg] file that should
contain at least the following:

```json
{
  "dependencies": {
    "@atomist/rug": "0.12.0"
  }
}
```

All you need as a minimum in that file is the dependency on the version of 
[Rug][rug] that matches what is specified in your `.atomist/manifest.yml` file.
You can add the usual NPM metadata but they will not be used by the Rug itself.

[npmpkg]: https://docs.npmjs.com/files/package.json

There is a [Rug generator available](https://github.com/atomist-rugs/rug-archive) 
that will create a minimal Rug project for you.

### Rug Project Repositories

Rug project source code repositories should have a good `README.md`
containing the following information at minimum:

-   A general description of the intent of the Rugs in the project,
    i.e., what ties them all together, at the top of the README.
-   A section named **Rugs** that has a subsection for each Rug.
-   A section for each Rug in the project with
    -   An explanation of what the Rug does, e.g., how will the
        source code be changed after running the editor.
    -   A subsection named *Prerequisites* describing what must be in
        place before running the Rug.
    -   A subsection named *Parameters* describing the Rug's input
        parameters, including examples of valid input values.
    -   A subsection named *Running* describing how to run the Rug and
        providing examples of how to run the Rug.
-   A **Support** section providing information on how to get help
    with the Rugs in the project.
-   A **Development** section providing information on how one would
    modify and test the Rugs.

Public Rug repositories should be automatically built, tested
and deployed using [Travis CI][travis].  The Travis CI build status
badge and the Slack badge for the Atomist Community should be placed
in the `README.md` between the page title and the general description.
Here is the Markdown text to add the Slack badge:

```
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)
```

[travis]: https://travis-ci.org/

Rug repositories should have a change log in the 
[`CHANGELOG.md` format][changelog].

[changelog]: http://keepachangelog.com/

### Rug Files

Rug files should have the standard TypeScript `.ts` extension.  
Rug files should placed in the following locations
within a _Rug project_.  Rug generators should be in `.atomist./generators`, 
editors should be in `.atomist/editors` and Rug reviewers should be in 
`.atomist/reviewers`

BDD-style tests for your Rugs are strongly recommended and should be
located within a `.atomist/tests` directory and have the `.rt`
extension.

If your Rugs, typically editors, use any templates, they are placed in
the `.atomist/templates` directory.

### Rug Naming

Rug editors, generators and reviewers should have their names
formatted using [UpperCamelCase][ucc].

[ucc]: http://wiki.c2.com/?UpperCamelCase

Following the rule of making implicit concepts explicit, the name of
your Rug should correspond to a complete and specific description of
the purpose of the Rug.

For example, `AddDocker` is a good name if the Rug adds Docker to
anything, but `AddDockerToMavenProjects` is better if the intention of
the Rug is to only work with projects that follow Maven conventions.

While a Rug file can contain many different kinds of Rug, the Rug runtime
enforces that the first Rug definition in a Rug file should match
the name of the file itself. Therefore Rug files should be formatted
using UpperCamelCase to match the name of the first Rug definition in
the file.

Further, Rugs within the same file are conventionally understood to be
in support of the main and initial Rug in the file.

### Rug Project Configuration

Rug project configuration is stored in a file in the `.atomist`
directory.  Rug projects declare their runtime dependencies in
`.atomist/manifest.yml` and their development dependencies in 
`.atomist/package.json`.

The Rug `.atomist/manifest.yml` should describe the Rug project
according to the following rules:

*   `group`: The organisation behind this Rug project. Most commonly
    the GitHub organisation in which they reside.

*   `artifact`: Name of the Rug archive (see next section)

*   `version`: [Semantic version][semver] of this Rug project

*   `requires`: Specify the exact, or bounded, version of the Rug
    language that your Rug project has been tested against.

When developing your Rug in TypeScript, then the corresponding
`package.json` in the `.atomist` is used for dependencies and any other
metadata require by the TypeScript compiler. The Atomist typings are added as
follows:

*   `dependencies`: At a minimum specifies the version of the Rug
    typings module that your Rug project has been tested against in the form
    `{ "@atomist/rug": "<rug-version>" }`

!!! note
    Adding the typings above does _not_ control the version of Rug itself. 
    The manifest.yml file does this*

[semver]: http://semver.org/

#### Rug Project Naming

A Rug project name should be hyphenated and start with the technology
stack being targeted, such as `spring-boot`, followed by `-editors` if
this is a Rug project with a collection of useful editors or reviewers.

If the main purpose of a Rug project is to be a generator, then ending
the name of the type of project it will generate would be most
appropriate.  For example if your Rug projects's main purpose was to be
a generator for a Spring Boot Rest Service then
`spring-boot-rest-service` or even `java-spring-boot-rest-service`
would be appropriate. If your Rug projects's main purpose was simply to
generate a valid Maven project then `maven-project` would be appropriate.


### Rug `@Tags` Decorator

Your Rugs should be annotated with a `@Tags` [decorator][tsdecorator] to 
optimise their  discoverability. For example if you were to create an editor 
that affected the `readme` `documentation` then the following `@Tags` decorator 
would be applicable.

```typescript
@Tags("readme", "documentation")
```


Tag values should consist of only lower case letters, numbers, and
dashes (`-`).

Please try to make sure at least one of the tags on your Rug maps to
an image.  The following tags currently have images: `docker`,
`github`, `travis-ci`, `apache`, `git`, `spring-boot`, `spring`,
`clojure`, `go`, `java`, `python`, `scala`, and `documentation`.

### Rug Descriptions

Rug editors, generators, reviewers, predicates, and parameters should be 
described for greater discoverability. Set that description in the Rug kind
[decorator][tsdecorator] alongside its name, for instance:

```typescript
@Editor("MyEditor", "adds a project specific README")
```

In parameters, this is done as follows:


```typescript
@Parameter({description: "the full path of the file to edit"})
```

A good description states exactly what the purpose of the Rug is
***without capitalisation on the sentence*** and ***without a closing
period***. The reason for avoiding sentence punctuation is that the
description is often used by the Atomist Bot and the grammar of its
usage is context-driven at that point.  Ideally the `description`
should be a sentence fragment and as short as possible.

### Parameters

Rug parameters are part of the public contract for invoking that
Rug. They should follow [snake_case][snake] rules and describe, as
explicitly as possible, what the parameter is to contain.

Parameters are defined using the `@Parameter` [decorator][tsdecorator] as 
follows:

```typescript
@Parameter({description: "the name of the class to search and edit", pattern: "@any"})
classname: string = ""
```

The decorator allows for the following fields, notice that `pattern` is 
the only mandatory field:

```TypeScript
interface Parameter {
  pattern: string
  required?: boolean
  description?: string
  displayName?: string
  validInput?: string
  displayable?: boolean
  maxLength?: number
  minLength?: number
  tags?: string[]
}
```
The name and default value of a parameter are taken from the code itself.


[snake]: https://en.wikipedia.org/wiki/Snake_case

#### The Mandatory `project_name` Parameter in Rug Generators

The `project_name` parameter is special when declared inside a
`generator` and so must be included otherwise your Rug will likely
fail to run.

It is recommended that you limit the `project_name` parameter to 21
characters in length as the new project name will often be used by
Atomist to construct a corresponding Slack channel and if the project
name is longer than 21 characters then some character-loss will occur.

#### Parameter Descriptions and Display Names

As Rug parameters are part of the public contract to the editor,
generator, reviewers, executor or predicate it is recommended that a
human-readable description and display name always be applied using
the `description` and `displayName` fields in the decorator.

See the [description](#rug-descriptions) section above for information on the 
content of the `description` field.  The `displayName` field value should be 
three words or less and use Title Case.

#### Parameter Validation

It is recommended that all parameters should be restricted using the
most explicit and constraining regular expression that is appropriate
for the corresponding parameter.  In addition, you should provide a
meaningful value for the `validInput` parameter field so, when
people provide an invalid value, they are provided with a useful error
message.

#### Mandatory and Optional Parameters

If a parameter is optionally provided on invocation, setting the
`required` field to `false`, then it is recommended to supply a meaningful
`default` value also so that there is some predictability of how
the Rug will function if no parameter is supplied.
