import React, { useEffect } from "react";
import FestCard from "./FestCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFestByUserId } from "../../State/Customers/Fest/fest.action";
import AddressCard from "../../customers/components/Address/AddressCard";
import AddFestCard from "./AddFestCard";


const AdminDashboard = () => {
  const params = useParams();
  const {fest}=useSelector(state=>state);
  console.log("params", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFestByUserId());
  }, []);

  return (
    <div className="lg:px-20">
     
      <div className="lg:flex flex-wrap justify-center">
        {fest.usersFest.map((item) => (
          <FestCard item={item}/>
        ))}
        {fest.usersFest.length<1 && <AddFestCard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
