import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Booked from "../pages/Booked"
import AboutUs from "../pages/AboutUs";
import CreateTour from "../components/CreateTour";
import AllTours from "../pages/AllTours";
import UserDetails from "../pages/UserDetails";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/alltours" element={<AllTours />} />
      <Route path="/tour" element={<Tours />} />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/booked" element={<Booked />} />
      <Route path="/createtour" element={<CreateTour />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
