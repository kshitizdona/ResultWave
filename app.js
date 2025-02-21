const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Result = require("./models/result");
const Subject = require("./models/subject");

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
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Routes
app.get("/", (req, res) => {
    res.render("products/home.ejs");
});

// Admin route
app.get("/admin", (req, res) => {
    res.render("admin/products/dashboard.ejs");
});

// Subject routes
app.get("/admin/subjects/new", (req, res) => {
    res.render("admin/products/newSubject.ejs");
});

app.post("/admin/subjects", async (req, res) => {
    const { semester, subjects, electives } = req.body;
    const subjectsToSave = subjects.map(subject => ({ ...subject, semester }));
    if (electives) {
        const electivesToSave = electives.map(elective => ({ ...elective, semester }));
        subjectsToSave.push(...electivesToSave);
    }
    await Subject.insertMany(subjectsToSave);
    res.redirect("/admin/subjects/new");
});

app.get("/admin/add-results", async (req, res) => {
    try {
        const subjects = await Subject.find({});
        console.log('Subjects being sent to view:', subjects);
        res.render("admin/products/addResults.ejs", { subjects });
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).send('Error loading subjects');
    }
});

app.post("/admin/add-results", async (req, res) => {
    const { year, level, symbolNumber, dob, semester, subjects, electiveI, electiveII } = req.body;
    const result = new Result({ year, level, symbolNumber, dob, semester, subjects, electiveI, electiveII });
    await result.save();
    res.redirect("/admin/add-results");
});

// // Admin route
// app.get("/admin", (req, res) => {
//     res.render("admin/products/dashboard.ejs");
// });

// app.get("/admin/results", async (req, res) => {
//     const results = await Result.find({});
//     res.render("admin/products/results.ejs", { results });
// });

// app.get("/admin/results/new", (req, res) => {
//     res.render("admin/products/new.ejs");
// });

// app.post("/admin/results", async (req, res) => {
//     const { year, level, result } = req.body;
//     const newResult = new Result({ year, level, result });
//     await newResult.save();
//     res.redirect("/admin/results");
// });

// app.get("/admin/results/:id/edit", async (req, res) => {
//     const { id } = req.params;
//     const result = await Result.findById(id);
//     res.render("admin/products/edit.ejs", { result });
// });

// app.put("/admin/results/:id", async (req, res) => {
//     const { id } = req.params;
//     const { year, level, result } = req.body;
//     await Result.findByIdAndUpdate(id, { year, level, result });
//     res.redirect("/admin/results");
// });

// app.delete("/admin/results/:id", async (req, res) => {
//     const { id } = req.params;
//     await Result.findByIdAndDelete(id);
//     res.redirect("/admin/results");
// });

// Start the server
app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});