import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TripPage from "./pages/TripPage";
import PlanPage from "./pages/PlanPage";
import NewTripForm from "./components/NewTripForm";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="user/trips">
          <Route index={true} element={<TripPage />} />
          <Route path="new" element={<NewTripForm />} />
        </Route>
        <Route path="user/trips/plans" element={<PlanPage />} />
      </Routes>
    </>
  );
}

export default App;
