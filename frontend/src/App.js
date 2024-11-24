import React from "react";
import { Routes, Route } from "react-router-dom";

//other paths for the login process
import RequireAuth from "./auth/RequireAuth";

//pages
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/Admin_Dashboard";
import RegisterPage from "./Pages/RegisterPage";
import Review from "./Pages/Reviews";
import Articles from "./Pages/Articles";
import Users from "./Pages/Users";
import AddArticle from "./Pages/AddArticle";
import AddReview from "./Pages/AddReview";
import EditReview from "./Pages/EditReview";
import EditArticle from "./Pages/EditArticle"; 



function App() {
  return (
    <Routes>
        {/* Public Interface */}
        <Route path="/login" element={<LoginPage />} />

       {/* Private Interfaces */}
        <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/Registration" element={<RegisterPage />} />
        <Route path="/Reviews" element={<Review />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AddArticle" element={<AddArticle />} />
        <Route path="/AddReview" element={<AddReview />} />
        <Route path="/editReview/:id" element={<EditReview />} />
        <Route path="/editArticle/:id" element={<EditArticle />} />
        </Route>
    </Routes>
  );
}

export default App;



