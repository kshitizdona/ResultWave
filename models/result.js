const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: String,
    internalMarks: Number,
    externalMarks: Number,
});

const resultSchema = new Schema({
    year: Number,
    level: String,
    symbolNumber: Number,
    dob: Date,
    semester: String,
    subjects: [subjectSchema],
    electiveI: [subjectSchema],
    electiveII: [subjectSchema]
});

module.exports = mongoose.model("Result", resultSchema); 