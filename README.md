# Node.js-exercises
### 📝 This repository contains NodeJS exercises followed through Udemy course on topic ''NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)''

### Phase 1
- Creating files: app.js, message.txt and routes.js
- In routes.js file is imported fs (file sistem) which is used to write inserted message in message.txt. 
- The message.txt file stores the message that the user enters each time (the message is not saved, it is overwritten each time)
- In app.js is used http port, imported route.js and used server which is created on implemented route. Server is listening on port 3000. 

### Phase 2
- Adding configuration file to a project (npm init - for starting configuration)
- Allows users who have not created a project to start the "npm start" project in a well-known way

### Phase 3
- Installing nodemon package whith command: npm install nodemon --save-dev
- Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### Phase 4

- Restarting the debugger automatically after editing application
- To do this step you need to:
1. Go to Debug/Add Configuration in VS Code
2. Go to launch.json and write lines of code:
   - "restart": true
   - "runtimeExecutable": "nodemon"
   - "console": "integratedTerminal"
3. In terminal write:
   - npm install nodemon -g (Windows)   
   - sudo npm install nodemon -g (Mac and Linux) 
   
### Phase 5
- Installing Express.js
- For installation it is necessary to run the following command through the terminal:

  1. npm install --save express
  
- Do some changes in app.js:

  1. const  express = require('express');

  2. const  app = express();

  3. const server = http.createServer(app);   
  
### Phase 6
- Adding Middleware 
- In app.js do some changes:
  1. app.use((req,res,next)=>{});
  
### Phase 7

- Parsing incoming requests

- For parsing incomming requests do next steps:
  
  1. In terminal type: npm install --save body parser
  
  2. Add some changes in app.js:
     
	 - const bodyParser = require('body-parser');

     - app.use(bodyParser.urlencoded({extended: true}));
  
  
