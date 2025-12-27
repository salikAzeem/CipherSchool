const mongoose = require("mongoose");
require("dotenv").config();

const Assignment = require("./models/Assignment");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected for seeding"))
  .catch(err => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  });


const assignments = [
  {
    title: "Basic SELECT",
    difficulty: "easy",
    description: "Practice simple SELECT queries",
    schemaName: "assignment_basic_select"
  },
  {
    title: "WHERE Clause",
    difficulty: "easy",
    description: "Filter rows using WHERE conditions",
    schemaName: "assignment_where"
  },
  {
    title: "Aggregation Functions",
    difficulty: "medium",
    description: "Use COUNT, SUM, AVG with GROUP BY",
    schemaName: "assignment_aggregation"
  }
];

async function seed() {
  try {
    await Assignment.deleteMany();
    await Assignment.insertMany(assignments);
    console.log("Assignments inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
