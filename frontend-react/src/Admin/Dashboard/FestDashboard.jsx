import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMenuItemsByFestId } from "../../State/Customers/Menu/menu.action";
import { Grid } from "@mui/material";
import BookingsTable from "../Bookings/BookingTable";
import MenuItemTable from "../Activity/MenuItemTable";
import AvgCard from "../ReportCard/ReportCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
// import FasteventIcon from "@mui/icons-material/Fastevent";

const FestDashboard = () => {
  const { id } = useParams();
  const {fest}=useSelector(store=>store);
  console.log("fests id ", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMenuItemsByFestId({
        festId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  console.log("fest",fest)
  return (
    <div className="px-2">
      
      <Grid container spacing={1}>
        {/* <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Total Earnings"}
            value={`Rs. ${450}`}
            growValue={70}
            icon={
              <CurrencyRupeeIcon sx={{ fontSize: "3rem", color: "gold" }} />
            }
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Total Selles"}
            value={`${390}`}
            growValue={35}
            icon={<SellIcon sx={{ fontSize: "3rem", color: "green" }} />}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Sold Items"}
            value={`${299}`}
            growValue={30}
            icon={<FastactivityIcon sx={{ fontSize: "3rem", color: "blue" }} />}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Left Items"}
            value={`${1}`}
            growValue={10}
            icon={<FastactivityIcon sx={{ fontSize: "3rem", color: "red" }} />
            
          }
          />
        </Grid> */}
        <Grid lg={6} xs={12} item>
          <BookingsTable name={"Recent Booking"} isDashboard={true} />
        </Grid>
        <Grid lg={6} xs={12} item>
          <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FestDashboard;
