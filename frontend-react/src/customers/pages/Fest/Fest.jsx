import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getFestById, getFestsCategory } from "../../../State/Customers/Fest/fest.action";
import { getMenuItemsByFestId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';

const categories = [
  "Technology",
  "Culinary",
  "Filmatography",
  "Dance",
  "Music",
  "industrial workshop",
  "Artistic",
];

const activityTypes = [
  {label:"All",value:"all"},
  { label: "Online", value: "onlineEvent" },
  { label: "Offline", value: "non_onlineEvent" },
  {label:"Group Events",value:"groupEvents"},
  
];
const Fest = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { fest, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const activityType = searchParams.get("activity_type");
  const activityCategory = searchParams.get("activity_category");
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(
      getFestById({
        jwt: localStorage.getItem("jwt"),
        festId: id,
      })
    );
    dispatch(
      getMenuItemsByFestId({
        jwt: localStorage.getItem("jwt"),
        festId: id,
        groupevents: activityType==="groupevents",
        onlineEvent: activityType==="onlineEvent",
        nonveg: activityType==="non_onlineEvent",
        activityCategory: activityCategory || ""
      })
    );
    dispatch(getFestsCategory({festId:id,jwt}))
  }, [id,activityType,activityCategory]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("activity_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <><div className="px-5 lg:px-20 ">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/{fest.fest?.address.country}/
          {fest.fest?.name}/{fest.fest?.id}/Booking Online
        </h3>
        <div>
         
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <img
            className="w-full h-[40vh] object-cover"
            src={fest.fest?.images[0]}
            alt=""
          />
            </Grid>
            <Grid item xs={12} lg={6}>
            <img
            className="w-full h-[40vh] object-cover"
            src={fest.fest?.images[1]}
            alt=""
          />
            </Grid>
            <Grid item xs={12} lg={6}>
            <img
            className="w-full h-[40vh] object-cover"
            src={fest.fest?.images[2]}
            alt=""
          />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {fest.fest?.name}
          </h1>
          <p className="text-gray-500 mt-1">{fest.fest?.description}</p>
          <div className="space-y-3 mt-3">
              <p className="text-gray-500 flex items-center gap-3">
            <LocationOnIcon/> <span>{fest.fest?.address.streetAddress}
              </span> 
          </p>
          <p className="flex items-center gap-3 text-gray-500">
           <TodayIcon/> <span className=" text-orange-300"> {fest.fest?.openingHours} (Today)</span>  
          </p>
          </div>
        
        </div>
      </section>
      <Divider />

      <section className="pt-[2rem] lg:flex relative ">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            
            <div className="">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Activity Type
              </Typography>
              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  name="activity_type"
                  value={activityType || "all"}
                  onChange={handleFilter}
                >
                  {activityTypes?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
                <Divider/>
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Activity Category
              </Typography>
                <RadioGroup
                  name="activity_category"
                  value={activityCategory || "all"}
                  onChange={handleFilter}
                >
                   <FormControlLabel
                      
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                    />
                  {fest?.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {menu?.menuItems.map((item) => (
            <MenuItemCard item={item} />
            // <p>ashok</p>
          ))}
        </div>
      </section>
    </div>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={menu.loading || fest.loading}
  
>
  <CircularProgress color="inherit" />
</Backdrop>
    </>
    
  );
};

export default Fest;
