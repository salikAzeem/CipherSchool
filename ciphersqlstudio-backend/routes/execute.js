const express = require("express");
const pool = require("../db_pg");

const router = express.Router();

router.post("/", async (req, res) => {
  const { query, schema } = req.body;

  if (!query || !schema) {
    return res.status(400).json({ error: "Query and schema required" });
  }

  const trimmed = query.trim();

  // 1) Only SELECT queries
  if (!trimmed.toLowerCase().startsWith("select")) {
    return res.status(400).json({ error: "Only SELECT queries are allowed" });
  }

  // 2) Block multi-statement SQL
  // Allow at most ONE semicolon, and only at the end
  const semicolons = trimmed.split(";").length - 1;
  if (semicolons > 1 || (semicolons === 1 && !trimmed.endsWith(";"))) {
    return res.status(400).json({
      error: "Multiple SQL statements are not allowed",
    });
  }

  try {
    const client = await pool.connect();
    try {
      // Switch schema for sandboxing
      await client.query(`SET search_path TO ${schema}`);

      // Execute query
      const result = await client.query(trimmed);

      res.json({
        rows: result.rows,
        rowCount: result.rowCount,
      });
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
