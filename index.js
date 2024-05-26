const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}.`);
});

const jsonParser = express.json();

app.use(jsonParser);

const logReq = (req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  next();
};

app.use(logReq);
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.get("/", (req, res) => {
    res.send("Try navigating to /user.");
  });
  
  app.get("/user", (req, res) => {
    res.send(`Received a GET request for user!
  Try navigating to /user/somevalue/profile/somevalue.`);
  });
  
  app.get("/user/:userID", (req, res) => {
    res.send(`Navigated to the user page for: ${req.params.userID}.`);
  });
  
  app.get("/user/:userID/profile", (req, res) => {
    res.send(`Navigated to the user profile page for: ${req.params.userID}.`);
  });
  
  app.route("/user/:userID/profile/:data") 
  .get((req, res) => {
    res.send(`Navigated to the user profile page for: ${req.params.userID}, with the data: ${req.params.data}.`);
  })
  .post((req, res) => {
    res.send("Add a user.");
  })
  .patch((req, res) => {
    res.send("Update the user's information.");
  });
  