# Node.js-exercises
### 📝 This repository contains NodeJS exercises followed through Udemy course on topic ''NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)''

### NOTE: When using my source code, make sure to run "npm install" in the extracted folder


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

- For parsing incoming requests do next steps:
  
  1. In terminal type: npm install --save body parser
  
  2. Add some changes in app.js:
     
	 - const bodyParser = require('body-parser');

     - app.use(bodyParser.urlencoded({extended: true}));
	 
### Phase 8

- Creating routes and views folders
- routes for storing routes for admin (which routes can use admin) and shop (which routes can use end users)
- views for storing HTML pages

### Phase 9

- Adding HTML and CSS to a project
- One note: add line "app.use(express.static(path.join(__dirname, 'public')));" if you serving files statically

### Phase 10

- Installing and Implementing pug

- To install pug write "npm install --save ejs pug express-handlers" in the terminal

- For implementing pug add some changes to:
  
  - app.js: "app.set('view engine','pug');"
  - shop.js: "res.render('shop');"
  
### Phase 11

- Converting project to handlebars

- To convert project to handlebars to next steps:
  
  - run command "npm install --save express-handlebars@3.0" in the terminal
  
  - add some changes in app.js:
     
	- app.engine('handlebars', expressHbs());
	- app.set('view engine','handlebars');

  - to use layouts to handlebars add changes to app.js:
    
	- app.engine(
	  'hbs',
	  expressHbs({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'main-layout',
		extname: 'hbs'
	  })
	);
	

### Phase 12

- Working with EJS template

- *To work with EJS you do not need to register app.engine()*;

- Add some changes to app.js *remove next lines of code*:
 
  - const expressHbs = require('express-handlebars');
  
  - app.engine(
	  'hbs',
	   expressHbs({
	   layoutsDir: 'views/layouts/',
	   defaultLayout: 'main-layout',
	   extname: 'hbs'
	  })
	);
 
### Phase 13 :: Working with MySQL

- Make sure to download MySQL Workbench
- To interact with SQL you need to write *"npm install -save mysql2"* in the terminal


### Phase 14 :: Working with Sequelize

- To work with sequelize you need to write *"npm install -save sequelize"* in the terminal


### Phase 15 :: Working with MongoDB

- Make sure to do next steps while working with MongoDB:
  
  - Create an account at mongoDB/Cloud/Atlas at: https://www.mongodb.com/cloud/atlas
  - Create new *user*
  - Add IP Address
  - Create a cluster
  - Download MongoBD Compass for required OS
  
- To work with MongoDB you need to write *"npm install -save mongodb"* in the terminal

### Phase 16 :: Working with Mongoose

- To work with Mongoose you need to write *"npm install -save mongoose"* in the terminal
- For more introduction to the mongoose, it is nice to learn from *https://mongoosejs.com/*

### Phase 17 :: Using the Session Middleware

- Write *npm install --save express-session* in the terminal to install Session
- Write: *app.js: const session = require('express-session');* in the app.js to include session in the project

### Phase 18 :: Using MongoBD to store sessions

- Write *npm install --save connect-mongodb-session* in the terminal to let express session package store data in the database
- Add changes in the app.js:
	- const MongoDBStore = require('connect-mongodb-session')(session);
	- const MONGODB_URI =   'mongodb+srv://merima98:merima1998@cluster0.w4ehk.mongodb.net/shop';
	- const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
	});
	- app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store
    })
	);
	- mongoose
	.connect(
		MONGODB_URI
		)
	.then(result=>{
		User.findOne().then(user=>{
			if(!user){
				const user = new User({
					name: 'Merima',
					email: 'merima@gmail.com',
					cart:{
						items: []
					}
				});
				user.save();
			}
		});
		app.listen(3500);
	}).catch(err=>{
		console.log(err);
		
### Phase 19 :: Adding Authentication

- Write *npm install --save bcryptjs* in the terminal. This is a package that helps us with encryption and that will help us with encrypting the password.

- *Using CSRF Token*
- Write *npm install --save csurf* in the terminal. This is a package for node express which allows us to genreate a so-called csrf token.

Working with Flash Messages: 
- Write *npm install --save connect-flash* in the terminal. This is a package that helps us to work with flash messages, and to show proper message to the end user.

Add changes in app.js: 
- const flash = require('connect-flash'); *- include it in the project*
- app.use(flash()); *- use it in the project (one note: use it after creating session!)*

SENDING EMAILS:
- Write *npm install --save nodemailer nodemailer-sendgrid-transport*. nodemailer nodemailer-sendgrid-transport


 



	 
  
  
