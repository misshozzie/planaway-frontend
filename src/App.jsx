import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TripPage from "./pages/TripPage";
import PlanPage from "./pages/PlanPage";
import PlanCard from './components/PlanCard';
import NewTripForm from "./components/NewTripForm";
import SignUp from "./pages/SignUp";
import NewPlanForm from "./components/NewPlanForm"
import UpdatePlanForm from "./components/UpdatePlanForm"
import ProfileUpdate from "./components/ProfileUpdateForm";
import Login from "./components/LoginForm";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="user/trips">
          <Route index={true} element={<TripPage />} />
          <Route path="new" element={<NewTripForm />} />
        </Route>
        <Route path="user/trips/plans/new" element={<NewPlanForm />} />
        <Route path="user/trips/plans" element={<PlanPage />} />
        <Route path="user/trips/plans/update" element={<UpdatePlanForm />} />
        <Route path="user/trips/plans/view" element={<PlanCard />} />
      </Routes>
    </>
  );
}

export default App;
