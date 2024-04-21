import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import festReducer from "../Customers/Fest/Reducer";
import menuItemReducer from "../Customers/Menu/Reducer";
import cartReducer from "../Customers/Cart/Reducer";
import { bookingReducer } from "../Customers/Bookings/booking.reducer";
import festsBookingReducer from "../Admin/Booking/fests.booking.reducer";
import superAdminReducer from "../SuperAdmin/superAdmin.reducer";
import { skillReducer } from "../Admin/Skills/Reducer";



const rootReducer=combineReducers({

    auth:authReducer,
    fest:festReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    booking:bookingReducer,

    // admin
    festsBooking:festsBookingReducer,
    skills:skillReducer,

    // super admin
    superAdmin:superAdminReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))