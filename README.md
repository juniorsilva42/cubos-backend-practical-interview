
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
- uses Node.js > v10;
- written using ES6;
- uses Yarn for package dependency management;
- uses [Airbnb Standard Style](https://github.com/airbnb/javascript)
- You can use NPM scripts or orchestration with Docker;

## Technology
Here's a brief overview of technology stack:
-  **[Express](https://github.com/expressjs/express)** as a tool to build the web server that handles our boleto endpoints.
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
   ├── config (config metadata of api)
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
   "data": rules array
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
   "date": now() date,
   "data": rules array
}   
  ```
  > `200 Ok`

#### 3. DELETE /schedule/rules/:ruleId

Delete a schedule rule by `uuid short id`, for example a id <sub>uXdF8bSBPaBN9GeLdqm2WM<sub>

  ```json
DELETE /schedule/rules/:ruleId HTTP/1.1
Content-Type: application/json
{
   "success": true,
   "version": "v1",
   "date": now() date,
}   
  ```
  > `200 Ok`