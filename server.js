// at Last write in the terminal (node server.js) to run server

//  node install express or npm install express
//  npm install body-parser(package-name)
//  npm install cors
//  npm install -g npm (for update only)

// Setup empty JS object to act as endpoint for all routes
//projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8900;

// spin up the server
const server = app.listen(port,listening);
// callback function
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

let projectData = {};
// getting data (1st input is path , 2nd fucntion)
app.get('/all',sendData);

// Declaring sendData
function sendData(req,res){
    // a response is sent using .send()
    res.send(projectData);
    projectData = {};
}

// Post Route
app.post('/add', addData);
// Declaring addData
function addData (req,res) {
    console.log("Request Body is : " + req.body);
    let newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
    }
    projectData.push(newEntry);
}

// at Last write in the terminal (node server.js) to run server
// http://localhost:8900