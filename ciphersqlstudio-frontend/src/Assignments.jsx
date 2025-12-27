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
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <h1 className="home__title">CipherSQLStudio</h1>
        <p className="home__subtitle">
          Learn SQL by writing real queries in a safe PostgreSQL sandbox
        </p>
      </section>

      {/* Assignments */}
      <section className="home__grid">
        {assignments.map((assignment) => (
          <div className="assignment-card" key={assignment._id}>
            <div className="assignment-card__content">
              <h3 className="assignment-card__title">
                {assignment.title}
              </h3>

              <p className="assignment-card__desc">
                {assignment.description}
              </p>
            </div>

            <div className="assignment-card__footer">
              <span className="assignment-card__difficulty">
                {assignment.difficulty.toUpperCase()}
              </span>

              <Link
                to={`/assignments/${assignment._id}`}
                className="assignment-card__cta"
              >
                Start →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Assignments;
