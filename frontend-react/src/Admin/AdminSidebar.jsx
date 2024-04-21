import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Bookings", icon: <ShoppingBagIcon />, path: "/bookings" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Activity Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Skills", icon: <FastfoodIcon />, path: "/skills" },
  { title: "Free Workshops", icon: <EventIcon />, path: "/freeworkshop" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export default function AdminSidebar({ handleClose, open }) {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/fest${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    } else if (item.title === "Fests") {
      navigate("/admin");
    }
    handleClose()
  };

  return (
    <div className=" ">
      <Drawer
        sx={{ zIndex: 1 }}
        anchor={"left"}
        open={open}
        onClose={handleClose}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <div className="w-[70vw] lg:w-[20vw] group h-[100vh] flex flex-col justify-center text-xl space-y-[1.65rem]">
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider key={`divider-${i}`} />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
