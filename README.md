[ ![Codeship Status for walidvb/diggersdelights](https://app.codeship.com/projects/b5a8a970-b073-0135-e1c4-524e5d7cafd3/status?branch=master)](https://app.codeship.com/projects/257676)

# README

## Start server
`$ rails server puma -b 'ssl://0.0.0.0:3000?key=.ssl/localhost.key&cert=.ssl/localhost.crt'`

## Run tests
`bundle exec rake`

## Setup

Create a DB called `plis_development`
`bundle exec rake db:create db:migrate`

### Populate database
`bundle exec rake db:seed` will create a user `you@me.com` with password `1234`


## ROADMAP
 
 -[X] Allow public/private posts
 -[X] Allow users to join a clique
 -[X] Make it invitation-based only
