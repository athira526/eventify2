// reducers.js
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionType.js";

const initialState = {
  loading: false,
  error: null,
  bookings:[]
};

const festsBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS_ORDER_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RESTAURANTS_ORDER_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };
    case UPDATE_ORDER_STATUS_SUCCESS:
      const updatedBookings = state.bookings.map((booking) => 
        booking.id === action.payload.id?action.payload:booking
      );
      return { ...state, loading: false, bookings: updatedBookings };
    case GET_RESTAURANTS_ORDER_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default festsBookingReducer;
