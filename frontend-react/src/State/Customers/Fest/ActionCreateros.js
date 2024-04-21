import * as actionTypes from './ActionTypes';
// Create Fest Actions
export const createFestRequest = () => ({
    type: actionTypes.CREATE_RESTAURANT_REQUEST,
  });
  
  export const createFestSuccess = (fest) => ({
    type: actionTypes.CREATE_RESTAURANT_SUCCESS,
    payload: fest,
  });
  
  export const createFestFailure = (error) => ({
    type: actionTypes.CREATE_RESTAURANT_FAILURE,
    payload: error,
  });

  // Get All Fests Actions (similar structure for other actions)
export const getAllFestsRequest = () => ({
    type: actionTypes.GET_ALL_RESTAURANTS_REQUEST,
  });
  
  export const getAllFestsSuccess = (fests) => ({
    type: actionTypes.GET_ALL_RESTAURANTS_SUCCESS,
    payload: fests,
  });
  
  export const getAllFestsFailure = (error) => ({
    type: actionTypes.GET_ALL_RESTAURANTS_FAILURE,
    payload: error,
  });
  

  // Delete Fest Actions
export const deleteFestRequest = () => ({
    type: actionTypes.DELETE_RESTAURANT_REQUEST,
  });
  
  export const deleteFestSuccess = (festId) => ({
    type: actionTypes.DELETE_RESTAURANT_SUCCESS,
    payload: festId,
  });
  
  export const deleteFestFailure = (error) => ({
    type: actionTypes.DELETE_RESTAURANT_FAILURE,
    payload: error,
  });


  // Update Fest Actions
export const updateFestRequest = () => ({
    type: actionTypes.UPDATE_RESTAURANT_REQUEST,
  });
  
  export const updateFestSuccess = (updatedFest) => ({
    type: actionTypes.UPDATE_RESTAURANT_SUCCESS,
    payload: updatedFest,
  });
  
  export const updateFestFailure = (error) => ({
    type: actionTypes.UPDATE_RESTAURANT_FAILURE,
    payload: error,
  });

  export const getFestByIdRequest = () => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_REQUEST,
  });
  
  export const getFestByIdSuccess = (fest) => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_SUCCESS,
    payload: fest,
  });
  
  export const getFestByIdFailure = (error) => ({
    type: actionTypes.GET_RESTAURANT_BY_ID_FAILURE,
    payload: error,
  });
  