const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: String,
    semester: String
});

module.exports = mongoose.model("Subject", subjectSchema);