# mongorpc

A RPC service that exposes the preconfigured mongodb instance publicly. This is
originally developed so that mongodb can be easily manipulated during testing
through a HTTP interface.

## Start Server

`npm start`

## Run test locally

`npm test`. This command depends on `docker-compose` to instantiate a testing
mongodb.
