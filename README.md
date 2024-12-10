# Project
This is my personnal project to manage freelance projects or missions that is published online. Sample CRUD Project with nextjs (typescript, drizzle, postgres, tailwind css, shacdn, next-auth, ...).

This is a learning application to use efficently nextjs and implement new feature from react 19

## Getting Started

First Install nodejs, yarn and docker

First, run the development server:

```bash
# install yarn
npm -g install yarn

# use yarn
yarn

docker compose up -d

# to install database
yarn db:reset-seed

# Start to test or code
yarn dev
```

## How to connect

| **Login**           | **Password**            |
|---------------------|-------------------------|
| **bastien@test.fr** | `rootroot1`             |

## How to create an user in the database
(on construction)

You must create a salt and use @noble library to generate your password.
@author: I will add a script later
