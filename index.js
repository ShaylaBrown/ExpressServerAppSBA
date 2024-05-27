const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("./index.css"));

const fs = require("fs");
app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);


    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); 
app.set("view engine", "perscholas"); 

app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };

  res.render("index", options);
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
  })
  .delete((req, res) => {
    res.send("Deleted.")
  });
  