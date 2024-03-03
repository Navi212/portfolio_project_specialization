require("dotenv").config();

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// adding middleware to parse the request body
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(express.static("public"));  // to serve static files
app.use(expressLayout);  // to use ejs layout
app.set("layout", "./layouts/main");  // to use ejs layout
app.set("view engine", "ejs");  // to use ejs template engine

app.use("/", require("./server/routes/main")); // to use the main route
app.use("/", require("./server/routes/admin")); // to use the admin route

app.listen(PORT, () => {
    console.log(`The server running on port -> ${PORT}`);
});
