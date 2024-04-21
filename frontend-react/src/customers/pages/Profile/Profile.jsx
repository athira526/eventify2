import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Bookings from "../Bookings/Bookings";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerFreeWorkshops from "./CustomerFreeWorkshops";
import Notifications from "./Notifications";

const Profile = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation />
      </div>
      {/* <Divider orientation="vertical" flexItem /> */}
      <div className="lg:w-[80%]">
        <Routes>
        <Route path="/" element={<UserProfile/>} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/address" element={<UsersAddresses/>} />
          <Route path="/favorites" element={<Favorite/>} />
          <Route path="/payments" element={<Bookings/>} />
          <Route path="/freeworkshops" element={<CustomerFreeWorkshops/>} />
          <Route path="/notification" element={<Notifications/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
