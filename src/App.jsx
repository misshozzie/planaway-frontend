import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "./services/user";
import HomePage from "./pages/HomePage";
import TripPage from "./pages/TripPage";
import PlanPage from "./pages/PlanPage";
import PlanCard from "./components/PlanCard";
import NewTripForm from "./components/NewTripForm";
import UpdateTripForm from "./components/UpdateTripForm";
import SignUp from "./pages/SignUp";
import NewPlanForm from "./components/NewPlanForm";
import UpdatePlanForm from "./components/UpdatePlanForm";
import ProfileUpdate from "./components/ProfileUpdateForm";
import Login from "./components/LoginForm";
import NavBar from "./components/NavBar";
import "./index.css";

function App() {
  const [user, setUser] = useState(getUser());
  // console.log("user", user);
  return (
    <main>
      {user ? (
        <>
          <NavBar username={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<TripPage username={user} />} />
            <Route path="/profile" element={<ProfileUpdate />} />

            <Route path="/user/trips" element={<TripPage username={user} />} />
            <Route path="/user/trips/new" element={<NewTripForm />} />
            <Route path="/user/trips/update" element={<UpdateTripForm />} />

            <Route
              path="/user/trips/plans/new/:tripid"
              element={<NewPlanForm />}
            />
            <Route path="/user/trips/plans/:tripid" element={<PlanPage />} />
            <Route
              path="/user/trips/plans/update/:tripid/:planid"
              element={<UpdatePlanForm />}
            />
            <Route path="/user/trips/plans/view" element={<PlanCard />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
