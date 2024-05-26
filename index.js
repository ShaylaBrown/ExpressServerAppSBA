const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}.`);
});

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.get("express", (req, res) => {
    res.send("Creating routes with Express is simple!");
});

