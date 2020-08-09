import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_POST,
  REDUX_PAGE_HELPERS,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default (page) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getSavedPost: true } });
  dispatch({ type: REDUX_PAGE_HELPERS, value: { page: page + 1 } });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/post/getAllSaved",
      method: "GET",
      params: { page },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    let data = getState().postArr.data;
    let hasMore = false;
    if (page == 1) {
      if (res.data.length >= 1) {
        hasMore = res.data.length < 5 ? false : true;
        data = [...res.data];
      } else {
        hasMore = false;
        data = [];
      }
    } else {
      if (res.data.length >= 1) {
        hasMore = res.data.length < 5 ? false : true;
        data = [...data, ...res.data];
      }
    }
    console.log(res);
    dispatch({
      type: REDUX_POST,
      value: { hasMore, data },
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getSavedPost: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getSavedPost: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getSavedPost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getSavedPost: true } });
  }
};
