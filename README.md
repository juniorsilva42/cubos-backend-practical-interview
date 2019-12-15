
## Cubos Tecnologia - Backend Practical Interview  :zap::white_medium_square:
> A microservice to manage clinic attendance hours
--------------------

Candidate: Ivanicio Junior   
E-mail: jsiilva@outlook.com.br   
Phone: +55 89 994112266  
[Linkedin](https://www.linkedin.com/in/jsilva49/) - [Github](https://github.com/jsiilva1/)

--------------------
  
## Table of Contents
- [Overview](#overview)
- [Technology](#technology)
- [Quick Start](#quick-start)
- [CLI Brief](#cli-brief)
- [Programming Standards - Airbnb Style Guides](#programming-standards---airbnb-style-guides)
  - [The Rules](#the-rules)
- [Data flow](#data-flow)

## Overview
#### Tech:
- uses Node.js > v10;
- written using ES6;
- uses Yarn for package dependency management;
- uses [Airbnb Standard Style](https://github.com/airbnb/javascript)
- You can use NPM scripts or orchestration with Docker;
#### Useful Information:
- You can access API docs at `http://localhost:<PORT>/api/<VERSION>/api-docs`. Usually: `http://localhost:5000/api/v1/api-docs	`
- The data file will be created in a `data` folder in the project root, called ` cubos-db.json` 
- The swagger documentation file and postman collections are located in the `docs` folder at the root of the project.
- Developed on Linux Ubuntu 19.10 Budgie Distro Platform

## Technology
Here's a brief overview of technology stack:
-  **[Express](https://github.com/expressjs/express)** as a tool to build the web server that handles with endpoints.
-  **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** as useful option to create development environment.
-  **[Mocha](https://www.npmjs.com/package/mocha)** as a test runner and **[Chai](http://chaijs.com)** to do some more advanced test assertions.
-  **[Nodemon](https://nodemon.io/)** as a tool to use for development file reload.
 -  **[CORS](https://www.npmjs.com/package/cors)** a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
 - **[Body-parser](https://www.npmjs.com/package/body-parser)** - Node.js body parsing middleware;
 -  **[Compression](https://www.npmjs.com/package/compression)** - Node.js compression middleware
 -  **[HTTP-Status](https://www.npmjs.com/package/http-status)** - Utility to interact with HTTP status code
 -  **[Ramda](https://www.npmjs.com/package/ramda)** -  A practical functional library for JavaScript programmers
 -  **[Winston](https://www.npmjs.com/package/winston)** -  A multi-transport async logging library
 -  **[Morgan](https://www.npmjs.com/package/morgan)** -  HTTP request logger middleware for node.js
 -  **[lowdb](https://www.npmjs.com/package/lowdb)** - A lightweight functional utility to interact with json files based on fs module 

A brief overview of the project file structure
```
├── src
   ├── infra 
   ├── interfaces 
     ├── http 
        ├── modules
        ├── middlewares
        ├── router.js 
   ├── server
      ├── app.js
      ├── shutdown.js 
   ├── bootstrap.js
   ├── container.js
   ├── index.js
```
- infra: lowest layer of all and is the limit to what is external to our application: database, core function etc;
-- jayessdb: abstract to handle with function of json db handlw lowdb;
-- logging: functions to handle with entrance and exit logs of app;
-- support: function of application core. Utils or not;
- interfaces: contains all application entry points. In this case, there modules (controllers), but could have CLI, websockets and so on;
-- middelwares: to handle with request/responses
-- modules: contains too all possible endpoints for the /foo-module path with a router;
- server: create a new express application;
- bootstrap.js: start application
- container.js: create a dispatch a singleton connections with IoC and DI on the application;
- index.js: start express app and bootsrap json database;

## Quick Start
1. Clone the repository with `git clone git@github.com:jsiilva1/cubos-backend-practical-interview.git`
2. Install the dependencies with `yarn or npm install`
3. Run the application in development mode with `yarn dev`
4. Access `http://localhost:<PORT>/api/<VERSION>`
    > Default setting usually: http://localhost:5000/api/v1

You can too
1. Run the application in development mode Docker from `docker-compose up`

## CLI Brief
- `yarn dev` - start the API locally/development
- `yarn test` - run tests
- `yarn lint` - lint codebase using Airbnb Standard Style
- `yarn lint:fix` - fix code according to ESlint Airbnb Style guide

## Programming Standards - Airbnb Style Guides
### The Rules

- **2 spaces** – for indentation
- **Single quotes for strings** – except to avoid escaping
- **No unused variables** – this one catches *tons* of bugs!
- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
- **Never start a line with `(`, `[`, or `` ` ``**
  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
  - [More details][4]
- **Space after keywords** `if (condition) { ... }`
- **Space after function name** `function name (arg) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
- Always handle the node.js `err` function parameter
- Always prefix browser globals with `window` – except `document` and `navigator` are okay
  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.


## Data flow

#### 1. POST /schedule/rules

Create a new rule with restrition of type weekly and days ['monday', 'wednesday'] rule

  ```json
POST /schedule/rules HTTP/1.1
Content-Type: application/json
{
   "attendanceType": "Pathology",
   "doctor": "House, M.D",
   "dateRule": {
     "type": "weekly",
     "days": ["monday","wednesday"],		
	 "intervals": [
	   { "start": "15:00",  "end": "16:00"}
	 ]
   }
}   
  ```
    > 201 Created
    > 403 Forbidden

#### 1.1 POST /schedule/rules

Create a new rule with a restrition to fixed date

  ```json
POST /schedule/rules HTTP/1.1
Content-Type: application/json
{
   "attendanceType": "Pathology",
   "doctor": "House, M.D",
   "dateRule": {
     "at": "31-08-2018",	
	 "intervals": [
	   { "start": "15:00",  "end": "16:00"}
	 ]
   }
}   
  ```
    > 201 Created
    > 403 Forbidden  

#### 1.2 POST /schedule/rules

Create a new rule with the restriction of existing daily within a time range

  ```json
POST /schedule/rules HTTP/1.1
Content-Type: application/json
{
   "attendanceType": "Pathology",
   "doctor": "House, M.D",
   "dateRule": {
     "type": "daily",	
	 "intervals": [
	   { "start": "15:00",  "end": "16:00"}
	 ]
   }
}   
  ```
  > `201 Created`
  > `403 Forbidden - server cannot process the body`

#### 2. GET /schedule/rules

Get all schedule rules

  ```json
GET /schedule/rules HTTP/1.1
Content-Type: application/json
{
   "success": true,
   "version": "v1",
   "date": now() date,
   "data": array
}   
  ```
  > `200 Ok`

#### 2.1 GET /schedule/rules/startDate::endDate

Get schedule rule by date range interval

  ```json
GET /schedule/rules/startDate::endDate HTTP/1.1
Content-Type: application/json
{
   "success": true,
   "version": "v1",
   "date": now(),
   "data": array
}   
  ```
  > `200 Ok`

#### 3. DELETE /schedule/rules/:ruleId

Delete a schedule rule by `uuid short id` (id example uXdF8bSBPaBN9GeLdqm2WM)

  ```json
DELETE /schedule/rules/:ruleId HTTP/1.1
Content-Type: application/json
{
   "success": true,
   "version": "v1",
   "date": now(),
}   
  ```
  > `200 Ok`

---

Made by Ivanicio Jr 
