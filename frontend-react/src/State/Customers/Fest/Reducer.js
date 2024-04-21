// Reducers.js
import * as actionTypes from "./ActionTypes";

const initialState = {
  fests: [],
  usersFest: null,
  fest: null,
  loading: false,
  error: null,
  freeworkshops: [],
  festsFreeWorkshops: [],
  categories: [],
};

const festReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_RESTAURANT_REQUEST:
    case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
    case actionTypes.DELETE_RESTAURANT_REQUEST:
    case actionTypes.UPDATE_RESTAURANT_REQUEST:
    case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
    case actionTypes.CREATE_CATEGORY_REQUEST:
    case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersFest:action.payload
      };
    case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        fests: action.payload,
      };
    case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        fest: action.payload,
      };
    case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
    case actionTypes.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersFest: action.payload,
      };

    case actionTypes.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        fests: state.fests.filter(
          (item) => item.id !== action.payload
        ),
        usersFest: state.usersFest.filter(
          (item) => item.id !== action.payload
        ),
      };

    case actionTypes.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        freeworkshops: [...state.freeworkshops, action.payload],
        festsFreeWorkshops: [...state.festsFreeWorkshops, action.payload],
      };
    case actionTypes.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        freeworkshops: action.payload,
      };
    case actionTypes.GET_RESTAIRANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        festsFreeWorkshops: action.payload,
      };
    case actionTypes.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        freeworkshops: state.freeworkshops.filter((item) => item.id !== action.payload),
        festsFreeWorkshops: state.festsFreeWorkshops.filter(
          (item) => item.id !== action.payload
        ),
      };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case actionTypes.CREATE_RESTAURANT_FAILURE:
    case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
    case actionTypes.DELETE_RESTAURANT_FAILURE:
    case actionTypes.UPDATE_RESTAURANT_FAILURE:
    case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
    case actionTypes.CREATE_EVENTS_FAILURE:
    case actionTypes.CREATE_CATEGORY_FAILURE:
    case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default festReducer;
