import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

function AssignmentDetail() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);

  // 🔹 Hint state
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load assignment", err);
        setLoading(false);
      });
  }, [id]);

  const runQuery = async () => {
    setRunning(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("http://localhost:5000/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          schema: assignment.schemaName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Query failed");
      } else {
        setResults(data.rows);
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setRunning(false);
    }
  };

  // 🔹 Simple conceptual hint generator (LLM stub)
  const getHint = () => {
    const q = query.toLowerCase();

    let message =
      "Start by identifying the table you need and the columns you want to retrieve.";

    if (q.includes("where")) {
      message =
        "Check your WHERE condition carefully. Are you filtering on the correct column and operator?";
    } else if (q.includes("join")) {
      message =
        "When using JOINs, make sure the join condition matches related keys between tables.";
    } else if (q.includes("group by")) {
      message =
        "Remember: non-aggregated columns in SELECT must appear in GROUP BY.";
    } else if (q.includes("order by")) {
      message =
        "ORDER BY affects the final output order—confirm it matches the requirement.";
    }

    setHint(message);
    setShowHint(true);
  };

  if (loading) return <p>Loading assignment...</p>;
  if (!assignment) return <p>Assignment not found.</p>;

  return (
    <div className="assignment-detail">
      <Link className="assignment-detail__back" to="/assignments">
        ← Back to assignments
      </Link>

      <h1 className="assignment-detail__title">
        {assignment.title}
      </h1>

      <p className="assignment-detail__meta">
        <strong>Difficulty:</strong> {assignment.difficulty}
      </p>

      <p className="assignment-detail__desc">
        {assignment.description}
      </p>

      <hr />

      <h3>Table Schema</h3>
      <p>(Will be shown here)</p>

      <h3>Sample Data</h3>
      <p>(Will be shown here)</p>

      <h3>SQL Editor</h3>

      <div className="sql-editor">
        <Editor
          height="160px"
          language="sql"
          theme="vs-dark"
          value={query}
          onChange={(value) => setQuery(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />

        <button
          className="sql-editor__button"
          disabled={!query.trim() || running}
          onClick={runQuery}
        >
          {running ? "Running..." : "Run Query"}
        </button>

        {/* 🔹 Hint button */}
        <button
          type="button"
          className="sql-editor__button"
          onClick={getHint}
          style={{ marginLeft: "0.5rem", backgroundColor: "#334155" }}
        >
          Get Hint
        </button>
      </div>

      {/* 🔹 Hint display */}
      {showHint && (
        <div className="hint-box">
          <strong>Hint:</strong>
          <p>{hint}</p>
        </div>
      )}

      <h3>Results</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && results.length === 0 && (
        <p>No rows returned</p>
      )}

      {results && results.length > 0 && (
        <table className="results-table">
          <thead className="results-table__head">
            <tr>
              {Object.keys(results[0]).map((col) => (
                <th key={col} className="results-table__th">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="results-table__body">
            {results.map((row, idx) => (
              <tr key={idx} className="results-table__row">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="results-table__td">
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssignmentDetail;
