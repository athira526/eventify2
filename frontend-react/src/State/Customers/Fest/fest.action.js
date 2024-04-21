// Actions.js

import { api } from "../../../config/api";
import {
  createFestFailure,
  createFestRequest,
  createFestSuccess,
  deleteFestFailure,
  deleteFestRequest,
  deleteFestSuccess,
  getAllFestsFailure,
  getAllFestsRequest,
  getAllFestsSuccess,
  getFestByIdFailure,
  getFestByIdRequest,
  getFestByIdSuccess,
  updateFestFailure,
  updateFestRequest,
  updateFestSuccess,
} from "./ActionCreateros";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_RESTAIRANTS_EVENTS_FAILURE,
  GET_RESTAIRANTS_EVENTS_REQUEST,
  GET_RESTAIRANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionTypes";

export const getAllFestsAction = (token) => {
  return async (dispatch) => {
    dispatch(getAllFestsRequest());
    try {
      const { data } = await api.get("/api/fests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllFestsSuccess(data));
      console.log("all fest ", data);
    } catch (error) {
      dispatch(getAllFestsFailure(error));
    }
  };
};

export const getFestById = (reqData) => {
  return async (dispatch) => {
    dispatch(getFestByIdRequest());
    try {
      const response = await api.get(`api/fests/${reqData.festId}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch(getFestByIdSuccess(response.data));
    } catch (error) {
      console.log("error",error)
      dispatch(getFestByIdFailure(error));
    }
  };
};

export const getFestByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/fests/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get fest by user id ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_RESTAURANT_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createFest = (reqData) => {
  console.log("token-----------", reqData.token);
  return async (dispatch) => {
    dispatch(createFestRequest());
    try {
      const { data } = await api.post(`/api/admin/fests`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch(createFestSuccess(data));
      console.log("created fest ", data);
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createFestFailure(error));
    }
  };
};

export const updateFest = ({ festId, festData, jwt }) => {
  return async (dispatch) => {
    dispatch(updateFestRequest());

    try {
      const res = await api.put(
        `api/admin/fest/${festId}`,
        festData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch(updateFestSuccess(res.data));
    } catch (error) {
      dispatch(updateFestFailure(error));
    }
  };
};
export const deleteFest = ({ festId, jwt }) => {
  return async (dispatch) => {
    dispatch(deleteFestRequest());

    try {
      const res = await api.delete(`/api/admin/fest/${festId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete fest ", res.data);
      dispatch(deleteFestSuccess(festId));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(deleteFestFailure(error));
    }
  };
};

export const updateFestStatus = ({ festId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `api/admin/fests/${festId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("ressssss ", res.data);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error ",error)
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createFreeWorkshopAction = ({ data, jwt,festId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const res = await api.post(
        `api/admin/freeworkshops/fest/${festId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create freeworkshops ", res.data);
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getAllFreeWorkshops = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const res = await api.get(`api/freeworkshops`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all freeworkshops ", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteFreeWorkshopAction = ({ freeworkshopId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const res = await api.delete(`api/admin/freeworkshops/${freeworkshopId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("DELETE freeworkshops ", res.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: freeworkshopId });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getActivityFreeWorkshops = ({ festId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAIRANTS_EVENTS_REQUEST });

    try {
      const res = await api.get(
        `/api/admin/freeworkshops/fest/${festId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get fests freeworkshop ", res.data);
      dispatch({ type: GET_RESTAIRANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_RESTAIRANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(`api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category ", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getFestsCategory = ({ jwt,festId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/fest/${festId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get fests category ", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};
