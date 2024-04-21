import { api } from "../../../config/api";
import {
  createMenuItemFailure,
  createMenuItemRequest,
  createMenuItemSuccess,
  deleteMenuItemFailure,
  deleteMenuItemRequest,
  deleteMenuItemSuccess,
  getMenuItemsByFestIdFailure,
  getMenuItemsByFestIdRequest,
  getMenuItemsByFestIdSuccess,
} from "./ActionCreators";
import {
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/skills/activity/16

export const createMenuItem = ({menu,jwt}) => {
  return async (dispatch) => {
    dispatch(createMenuItemRequest());
    try {
      const { data } = await api.post("api/admin/activity", menu,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created menu ", data);
      dispatch(createMenuItemSuccess(data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createMenuItemFailure(error));
    }
  };
};

export const getMenuItemsByFestId = (reqData) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByFestIdRequest());
    try {
      const { data } = await api.get(
        `/api/activity/fest/${reqData.festId}?onlineEvent=${reqData.onlineEvent}&nonveg=${reqData.nonveg}
        &groupevents=${reqData.groupevents}&activity_category=${reqData.activityCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu item by fests ", data);
      dispatch(getMenuItemsByFestIdSuccess(data));
    } catch (error) {
      dispatch(getMenuItemsByFestIdFailure(error));
    }
  };
};

export const searchMenuItem = ({keyword,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/activity/search?name=${keyword}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data ----------- ", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE });
    }
  };
};

export const getAllSkillsOfMenuItem = (reqData) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByFestIdRequest());
    try {
      const { data } = await api.get(
        `api/activity/fest/${reqData.festId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu item by fests ", data);
      dispatch(getMenuItemsByFestIdSuccess(data));
    } catch (error) {
      dispatch(getMenuItemsByFestIdFailure(error));
    }
  };
};

export const updateMenuItemsAvailability = ({activityId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`/api/admin/activity/${activityId}`, {},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update menuItems Availability ", data);
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ",error)
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
};
};

export const deleteActivityAction = ({activityId,jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/activity/${activityId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete activity ", data);
    dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: activityId });
  } catch (error) {
    dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
  }
};
