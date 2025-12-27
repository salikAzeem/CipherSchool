const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: "Invalid assignment ID" });
  }
});

module.exports = router;
