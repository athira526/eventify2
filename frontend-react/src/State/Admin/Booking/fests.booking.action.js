// actions.js
import axios from "axios";
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionType.js";
import { api } from "../../../config/api.js";

export const updateBookingStatus = ({bookingId,bookingStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `/api/admin/bookings/${bookingId}/${bookingStatus}`,{},{
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedBooking = response.data;

      console.log("udpdated booking ", updatedBooking);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updatedBooking,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
    }
  };
};

export const fetchFestsBooking = ({festId,bookingStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

      const { data } = await api.get(
        `/api/admin/booking/fest/${festId}`,{
          params: { booking_status:bookingStatus},
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const bookings = data;
      console.log("fests booking ------ ", bookings);
      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: bookings,
      });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
    }
  };
};
