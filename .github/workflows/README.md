# Github Workflow

## Pull request를 위한 lint 설정

pull request, push, build 체크

```yml
name: Github Action
on:
  pull_request:
    types: ['opened', 'edited', 'reopened', 'synchronize']
  push:
    branches:
      - master
      - main
    tags:
      - v*
jobs:
  lint-pull-request-name:
    name: Pull Request Check
    runs-on: ubuntu-latest
    # Only on pull requests
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v1
      - run: yarn add @commitlint/config-conventional
      - uses: JulienKode/pull-request-name-linter-action@v0.5.0
        with:
          configuration-path: ./commitlint.config.js # optional, default is ./commitlint.config.js

  lint-commits:
    name: Push Check
    runs-on: ubuntu-latest
    # Only if we are pushing or merging PR to the master(main)
    if: (github.event_name == 'pull_request' && github.base_ref == 'refs/heads/master') || github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: wagoid/commitlint-github-action@v4
        with:
          configFile: ./commitlint.config.js # optional, default is ./commitlint.config.js

  lint-build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint-commits, lint-pull-request-name]

    # `always()` function which will tell your job to always run.
    # `contains(needs.*.result, 'success')` will be true if at least one of the jobs succeeded.
    # `!(contains(needs.*.result, 'failure'))` is false if any job failed
    # So if all your jobs are skipped it will be false.
    # Only on git commit message rule corresponds to build type
    if: ${{ always() && contains(needs.*.result, 'success') && !(contains(needs.*.result, 'failure')) && contains(github.event.head_commit.message, 'build:') }}
    steps:
      - run : echo succeed


```