[ ![Codeship Status for walidvb/diggersdelights](https://app.codeship.com/projects/b5a8a970-b073-0135-e1c4-524e5d7cafd3/status?branch=master)](https://app.codeship.com/projects/257676)

# README

## Start server
`$ foreman start -f Procfile.dev`

## Run tests
`$ bundle exec rake`

_currently, cucumber tests are broken due to the react integration. Will need repairing at some point. RSPECs should never fail_

# Setup

Create a DB called `plis_development` with user `gaston`

`$ bundle exec rake db:create db:migrate`

### Setup tests
Create a DB called `plis_test` with user `gaston`

`$ bundle exec rake db:test:prepare`

### Populate database
`$ bundle exec rake db:seed` will create a user `you@me.com` with password `1234`

## Tooling

[React dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
[ReduxDevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)


## ROADMAP
 
 - [X] Make it invitation-based only
 - [ ] 
