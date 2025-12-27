const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  description: String,
  schemaName: String
});

module.exports = mongoose.model("Assignment", assignmentSchema);
