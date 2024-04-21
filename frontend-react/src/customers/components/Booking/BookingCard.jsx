import { Button, Card } from "@mui/material";
import React from "react";

const BookingCard = ({booking,status}) => {
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src={booking.activity.images[0]}
          alt=""
        />
        <div>
          <p>{booking.activity.name}</p>
          <p className="text-gray-400">₹{booking.activity.price}</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed" variant="contained">{status}</Button>
      </div>
    </Card>
  );
};

export default BookingCard;
