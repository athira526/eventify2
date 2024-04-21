// Actions.js
import * as actionTypes from './ActionTypes';

// Create Booking Actions
export const createBookingRequest = () => ({
  type: actionTypes.CREATE_ORDER_REQUEST,
});

export const createBookingSuccess = (booking) => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
  payload: booking,
});

export const createBookingFailure = (error) => ({
  type: actionTypes.CREATE_ORDER_FAILURE,
  payload: error,
});

export const getUsersBookingsRequest = () => ({
    type: actionTypes.GET_USERS_ORDERS_REQUEST,
  });
  
  export const getUsersBookingsSuccess = (bookings) => ({
    type: actionTypes.GET_USERS_ORDERS_SUCCESS,
    payload: bookings,
  });
  
  export const getUsersBookingsFailure = (error) => ({
    type: actionTypes.GET_USERS_ORDERS_FAILURE,
    payload: error,
  });
  