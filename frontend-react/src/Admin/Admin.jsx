import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import FestDashboard from "./Dashboard/FestDashboard";
import FestsBooking from "./Bookings/FestsBooking";
import FestsMenu from "./Activity/FestsMenu";
import AddMenuForm from "./Activity/AddMenuForm";
import CreateFestForm from "./AddFests/CreateFestForm";
import SkillTable from "./FreeWorkshops/FreeWorkshops";
import Category from "./Category/Category";
import Skills from "./Skills/Skills";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkillCategory,
  getSkillsOfFest,
} from "../State/Admin/Skills/Action";
import { getFestsCategory } from "../State/Customers/Fest/fest.action";
import Details from "./Details/Details";
import AdminNavbar from "./AdminNavbar";
import { getUsersBookings } from "../State/Customers/Bookings/Action";
import { fetchFestsBooking } from "../State/Admin/Booking/fests.booking.action";

const Admin = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, fest, skills } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (fest.usersFest) {
      dispatch(
        getSkillCategory({ jwt, id: fest.usersFest?.id })
      );
      dispatch(
        getSkillsOfFest({ jwt, id: fest.usersFest?.id })
      );
      dispatch(
        getFestsCategory({
          jwt: auth.jwt || jwt,
          festId: fest.usersFest?.id,
        })
      );

      dispatch(
        fetchFestsBooking({
          festId: fest.usersFest?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [fest.usersFest]);
  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>

        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/" element={<FestDashboard />} />
            <Route path="/bookings" element={<FestsBooking />} />
            <Route path="/menu" element={<FestsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-fest" element={<CreateFestForm />} />
            <Route path="/freeworkshop" element={<SkillTable />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
