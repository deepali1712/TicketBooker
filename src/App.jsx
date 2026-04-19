import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* The Layout wraps all these pages so the Navbar stays visible */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Dynamic Category Dashboards */}
          <Route path="/movies" element={<CategoryPage />} />
          <Route path="/stream" element={<CategoryPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/plays" element={<CategoryPage />} />
          <Route path="/sports" element={<CategoryPage />} />
          <Route path="/activities" element={<CategoryPage />} />

          {/* Auth and Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          {/* Seat Selection */}
          <Route path="/booking/:id" element={<Booking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // <--- THIS IS THE LINE THAT FIXES YOUR ERROR
