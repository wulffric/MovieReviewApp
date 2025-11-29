import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Reviews from "./pages/Reviews.jsx";
import AddReview from "./pages/AddReview.jsx";
import Profile from "./pages/Profile.jsx"; // New

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/addreview" element={<AddReview />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}