## What goes in a Rug Project?

A key design goal was to respect your own tooling as much as possible
so that ***every project should be a working Atomist project, and
every Atomist project is a working project***.

Rugs can be expressed and packaged alongside your existing projects. 
A project that has a `.atomist` directory, along with some other artifacts 
that we'll explain here, is referred to as a *Rug project*.

A packaged (zipped) Rug Project is referred to as a *Rug project*.

### Exploring a very basic Rug Project

A very basic Rug project, along with some example Rug scripts and
other bits and pieces, is provided by creating a new project using
the [Rug project generator][rug-generator].  You can run this
generator using the Atomist Button below.

[rug-generator]: https://github.com/atomist-rugs/rug-editors

[<img src="https://images.atomist.com/button/create-project.png" width="267" alt="Get Started with Atomist"/>](https://api.atomist.com/v1/projects/generators/99515d85-80ad-4e97-bf26-ed5a5406da05)

The resulting project will have the following contents:

```
README.md
.atomist/
  pom.xml
  assembly.xml
  tests/
  editors/
  reviewers/
  templates/
.atomist.yml
```

The `README.md` is a standard project README file.  The
`atomist.yml` file provides information on what Rugs have operated
on the repo.  The contents of the `.atomist` directory are described
in the next section.

### The `.atomist` directory

Atomist Rug artifacts need to work happily alongside whatever
languages, frameworks or other artifacts may be present in your
project. For this reason, Rug artifacts are safely contained in a
`.atomist` directory that has the following general structure:

```
.atomist/
  manifest.yml <= Metadata for the Rug project
  editors/     <= Rugs providing editors, generators, and conditional predicates
  executors/   <= Rugs that will work across multiple repositories
  reviewers/   <= Rugs that will provide feedback
  templates/   <= Templates  used by Rugs
  tests/       <= BDD-style tests for your Rugs
```

Please refer to the [reference](/reference-docs/rug/index.md) documentation to 
explore the concepts behing each of these.

### Next steps

*   [Explore the syntax of Rug tests](/rug/guides/rug-tests.md)
*   [Explore the syntax of Rug editors](/rug/guides/rug-editors.md)
*   [Explore the syntax of Rug generators](/rug/guides/rug-generators.md)
