const functions = require("firebase-functions");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = 3000;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
app.use(express.static("public"));
app.use(bodyParser.json());
// for parsing application/json

let database = {};

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

exports.app = functions.https.onRequest(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
