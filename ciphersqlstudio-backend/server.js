const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const assignmentRoutes = require("./routes/assignments");
const executeRoutes = require("./routes/execute");

const app = express();

// ✅ CORS must come BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/execute", executeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
