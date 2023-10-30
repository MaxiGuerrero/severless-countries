# Project countries using serverless

This project is used by study, using serverless in AWS. Also, to use design patterns to create a clean code.

## Patterns used

This code is organize by a pattern know "Vertical Slicing".

The idea of this code is generate "components" that will be used in each service injecting via "dependencies injection".

## Installation

To install this project the commands are:

        npm run install

## Run in LOCAL

To run this project in Local the command that you need use is:

        npm run start

## Deploy in AWS

First your must create a .env file in root of this project.

Then your must fill the next fields:

        AWS_ACCESS_KEY_ID=""

        AWS_SECRET_ACCESS_KEY=""

Once that your fill this variables, your must run this command:

        npm run deploy
