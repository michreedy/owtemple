const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

admin.initializeApp();

var firebaseConfig = {
  apiKey: "AIzaSyB0fg5dGrlZ6y1GKo0wltHL3I6IvdSUNAM",
  authDomain: "https://owtemple.com",
  databaseURL: "https://ow-temple.firebaseio.com",
  projectId: "ow-temple",
  storageBucket: "",
  messagingSenderId: "844287921405",
  appId: "1:844287921405:web:d43912a7eaa1b698"
};

FirebaseFirestore.initializeApp(firebaseConfig);
var db = firebase.firestore();

const myPostFunction = (request, response) => {
  const user = request.body;
  const name = user.name;
  const email = user.email;

  database[name] = user;

  console.log(`my email is: ${email}`);

  response.status(200).send({ url: `/account/${name}` });
};

app.get("/", (req, res) => res.sendFile(__dirname + "/pages/index.html"));
app.get("/account/:name", (req, res) => {
  const name = req.params.name;
  const user = database[name];
  res.set("Content-Type", "text/html");
  res.send(new Buffer(`<h1>hi, ${name}, your email is ${user.email}</h1>`));
});
app.post("/new-account", myPostFunction);
