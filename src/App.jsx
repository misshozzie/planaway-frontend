import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TripPage from "./pages/TripPage";
import PlanPage from "./pages/PlanPage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<TripPage />} />
        <Route path="/:username/:tripid" element={<PlanPage />} />
      </Routes>
    </>
  );
}

export default App;
