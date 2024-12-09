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

# Check your database fist and watch evrything is okay
yarn db:check
# Generate Drizzle Database script
yarn db:generate
# Generate your database
yarn db:migrate

# Start to test or code
yarn dev
```
