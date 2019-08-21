const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
app.use(express.static("public"));
app.use(bodyParser.json());
// for parsing application/json
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original: original });
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
