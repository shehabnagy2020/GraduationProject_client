import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_BLOCK_DATA,
  REDUX_CLEAR,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getBlockData: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getBlockData",
      method: "GET",
      params: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_BLOCK_DATA, value: res.data });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getBlockData: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBlockData: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getBlockData: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getBlockData: false } });
  }
};
