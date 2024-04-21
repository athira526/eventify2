// action.js
import axios from 'axios';
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from './ActionType';
import { API_URL, api } from '../../../config/api';

export const getSkillsOfFest = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/skills/fest/${id}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all skills ",response.data)
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data // Assuming the response contains the skills data
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const createSkill = ({data,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/skills`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create skills ",response.data)
      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const createSkillCategory = ({data,jwt}) => {
  console.log("data ",data,"jwt",jwt)
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/skills/category`,data,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create skills category",response.data)
      dispatch({
        type:CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

export const getSkillCategory = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/skills/fest/${id}/category`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get skills category",response.data)
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data 
      });
    } catch (error) {
        console.log("error",error)
      
    }
  };
};

export const updateStockOfSkill = ({id,jwt}) => {
  return async (dispatch) => {
    try {
      const {data} = await api.put(`/api/admin/skills/${id}/stoke`, 
      { },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: UPDATE_STOCK,
        payload: data
      });
      console.log("update skills stock ",data)
    } catch (error) {
        console.log("error ",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};
