import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Assignments from "./Assignments";
import AssignmentDetail from "./AssignmentDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to assignments */}
        <Route path="/" element={<Navigate to="/assignments" replace />} />

        <Route path="/assignments" element={<Assignments />} />
        <Route path="/assignments/:id" element={<AssignmentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
