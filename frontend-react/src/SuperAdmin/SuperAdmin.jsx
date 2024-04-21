import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import FestTable from "./Fests/FestTable";
import SuperAdminFest from "./Fests/SuperAdminFest";
import FestRequest from "./FestRequest/FestRequest";
// import AdminDashboard from "./Dashboard/AdminDashboard";
// import AdminSidebar from "./AdminSidebar";
// import FestDashboard from "./Dashboard/FestDashboard";
// import FestsBooking from "./Bookings/FestsBooking";
// import FestsMenu from "./MenuItem/FestsMenu";
// import AddMenuForm from "./AddMenu/AddMenuForm";
// import CreateFestForm from "./AddFests/CreateFestForm";

const SuperAdmin = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="">
       
        <SuperAdminSidebar />
      </div>

      <div className="w-[80vw]">
        <Routes>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path="/fests" element={<SuperAdminFest/>}></Route>
          <Route path="/fest-request" element={<FestRequest/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
