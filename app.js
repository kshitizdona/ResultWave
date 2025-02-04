const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");

// Connect to Database
const MONGO_URL = "mongodb://127.0.0.1:27017/resultwave";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);


// Routes
app.get("/", (req, res) => {
    res.render("products/home.ejs");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});