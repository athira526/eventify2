import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFestsBooking,
  updateBookingStatus,
} from "../../State/Admin/Booking/fests.booking.action";
// import {
//   confirmBooking,
//   deleteBooking,
//   deliveredBooking,
//   getBookings,
//   shipBooking,
// } from "../../state/Admin/Booking/Action";

const bookingStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const BookingsTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { festsBooking } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const { id } = useParams();

  const handleUpdateStatusMenuClick = (freeworkshop, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = freeworkshop.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateBooking = (bookingId, bookingStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateBookingStatus({ bookingId, bookingStatus,jwt }));
  };

  // console.log("fests bookings store ", festsBooking)

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
              <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                {/* {!isDashboard && <TableCell>Title</TableCell>} */}
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
             
                <TableCell>Name</TableCell>
                {!isDashboard && <TableCell>Skills</TableCell>}
                {!isDashboard &&<TableCell>Status</TableCell>}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
                {/* {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {festsBooking.bookings
                ?.slice(0, isDashboard ? 7 : festsBooking.bookings.length)
                .map((item, index) => (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { bbooking: 0 },
                    }}
                  >
                    <TableCell>{item?.id}</TableCell>
                    <TableCell sx={{}}>
                      <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                        {item.items.map((bookingItem) => (
                          <Avatar
                            alt={bookingItem.activity.name}
                            src={bookingItem.activity?.images[0]}
                          />
                        ))}
                      </AvatarGroup>{" "}
                    </TableCell>

                    <TableCell sx={{}}>
                      {item?.customer.email}
                    </TableCell>

                    <TableCell>₹{item?.totalAmount}</TableCell>
                    
                    <TableCell className="">
                      {item.items.map((bookingItem) => (
                        <p>
                          {bookingItem.activity?.name}
                        </p>
                      ))}
                    </TableCell>
                  {!isDashboard &&  <TableCell className="space-y-2">
                      {item.items.map((bookingItem) =>
                      <div className="flex gap-1 flex-wrap">
                       { bookingItem.skills?.map((ingre) => (
                          <Chip label={ingre} />
                        ))}
                      </div>
                        
                      )}
                    </TableCell>}
                    {!isDashboard &&<TableCell className="text-white">
                      <Chip
                        sx={{
                          color: "white !important",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                        label={item?.bookingStatus}
                        size="small"
                        color={
                          item.bookingStatus === "PENDING"
                            ? "info"
                            : item?.bookingStatus === "DELIVERED"
                            ? "success"
                            : "secondary"
                        }
                        className="text-white"
                      />
                    </TableCell>}
                    {!isDashboard && (
                      <TableCell
                        sx={{ textAlign: "center" }}
                        className="text-white"
                      >
                        <div>
                          <Button
                            id={`basic-button-${item?.id}`}
                            aria-controls={`basic-menu-${item.id}`}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElArray[index])}
                            onClick={(freeworkshop) =>
                              handleUpdateStatusMenuClick(freeworkshop, index)
                            }
                          >
                            Status
                          </Button>
                          <Menu
                            id={`basic-menu-${item?.id}`}
                            anchorEl={anchorElArray[index]}
                            open={Boolean(anchorElArray[index])}
                            onClose={() => handleUpdateStatusMenuClose(index)}
                            MenuListProps={{
                              "aria-labelledby": `basic-button-${item.id}`,
                            }}
                          >
                            {bookingStatus.map((s) => (
                              <MenuItem
                                onClick={() =>
                                  handleUpdateBooking(item.id, s.value, index)
                                }
                              >
                                {s.label}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      </TableCell>
                    )}
                    {/* {!isDashboard && (
                    <TableCell
                      sx={{ textAlign: "center" }}
                      className="text-white"
                    >
                      <Button
                        onClick={() => handleDeleteBooking(item._id)}
                        variant="text"
                      >
                        delete
                      </Button>
                    </TableCell>
                  )} */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={festsBooking.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default BookingsTable;
