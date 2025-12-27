import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/assignments")
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  return (
    <div className="assignments">
      <h2 className="assignments__title">SQL Assignments</h2>

      <div className="assignments__list">
        {assignments.map((assignment) => (
          <div className="assignment-card" key={assignment._id}>
            <h3 className="assignment-card__title">
              {assignment.title}
            </h3>

            <p className="assignment-card__desc">
              {assignment.description}
            </p>

            <span className="assignment-card__difficulty">
              {assignment.difficulty}
            </span>

            <Link
              className="assignment-card__link"
              to={`/assignments/${assignment._id}`}
            >
              View Assignment →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments;
