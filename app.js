require("dotenv").config();

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// addind middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
    console.log(`The server running on port -> ${PORT}`);
});
