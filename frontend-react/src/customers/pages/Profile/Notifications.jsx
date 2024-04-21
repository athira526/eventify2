import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Bookings/Action";
import { Card } from "@mui/material";

const Notifications = () => {
  const dispatch = useDispatch();

  const { booking } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersNotificationAction());
  }, []);

  return (
    <div className="space-y-5 px-5 lg:px-20">
      <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
      {booking.notifications.map((item) => (
        <Card className="p-5">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
