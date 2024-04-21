import React, { useEffect } from "react";
import BookingsTable from "./BookingTable";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFestsBooking } from "../../State/Admin/Booking/fests.booking.action";

const bookingStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  // { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  // { label: "Delivered", value: "DELIVERED" },
  { label: "All", value: "all" },
];

const FestsBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const { fest, auth } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("booking_status");

  useEffect(() => {
    dispatch(
      fetchFestsBooking({
        festId: fest.usersFest?.id,
        bookingStatus: filterValue,
        jwt: auth.jwt || jwt,
      })
    );
  }, [auth.jwt, filterValue]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("booking_status");
    } else searchParams.set("booking_status", e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  
  return (
    <div className="px-2">
      <Card className="p-5">
        <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
          Booking Status
        </Typography>
        <FormControl className="py-10" component="fieldset">
          <RadioGroup
            row
            name="category"
            value={filterValue ? filterValue : "all"}
            onChange={handleFilter}
          >
            {bookingStatus.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <BookingsTable name={"All Bookings"} />
    </div>
  );
};

export default FestsBooking;
