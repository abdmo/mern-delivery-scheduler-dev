# Delivery Scheduler

This is a simple truck delivery scheduling system that is based on MERN stack. Database used in this app is from free tier MongoDB Atlas. Make sure to create an account to use Atlas with this app

## Dependencies

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Setup network and database access
  - Save connection string \<CONNECTION_URI\>

## Running the app

1. Install dependencies

   ```sh
   npm install
   cd client && npm install
   ```

2. Update database URI. Update <ATLAS_URI> and <TEST_ATLAS_URI> environment in .env file with <CONNECTION_URI>

3. Run app in local host

   ```sh
   npm run dev
   # Client app will be available in localhost:3000
   ```

4. Run backend unit testing. Testing will use database specified in <TEST_ATLAS_URI> in .env

   ```sh
   npm test
   ```

## Workflow

TODO: insert flowchart diagram

### CI/CD

For the purpose of demo-ing CI/CD, another private production repo is being used which contains the same code as this repo but with confidential database URI

- CI has been setup via CircleCI which will build the app upon commit and send notifications to developer through email. CI config is available at .circleci/config.yml

  TODO: insert CI pipeline and email snapshot

- CD has been setup via Heroku which will deploy app upon commit at https://mern-delivery-scheduler.herokuapp.com after CI has passed

  TODO: insert CD snapshot
