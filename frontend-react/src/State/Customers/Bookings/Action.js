import { api } from "../../../config/api";
import { createBookingFailure, createBookingRequest, createBookingSuccess, getUsersBookingsFailure, getUsersBookingsRequest, getUsersBookingsSuccess } from "./ActionCreators";
import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


export const createBooking = (reqData) => {
  return async (dispatch) => {
    dispatch(createBookingRequest());
    try {
      const {data} = await api.post('/api/booking', reqData.booking,{
        headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
      });
      if(data.payment_url){
        window.location.href=data.payment_url;
      }
      console.log("created booking data",data)
      dispatch(createBookingSuccess(data));
    } catch (error) {
      console.log("error ",error)
      dispatch(createBookingFailure(error));
    }
  };
};


export const getUsersBookings = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersBookingsRequest());
    try {
      const {data} = await api.get(`/api/booking/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users booking ",data)
      dispatch(getUsersBookingsSuccess(data));
    } catch (error) {
      dispatch(getUsersBookingsFailure(error));
    }
  };
};


export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createBookingRequest());
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
