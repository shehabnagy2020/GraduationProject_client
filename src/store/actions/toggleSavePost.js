import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";
import getSavedPost from "./getSavedPost";
import getPost from "./getPost";

export default (post_id, type) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleSavePost: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/post/toggleSavePost",
      method: "PUT",
      data: { post_id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    if (type == "post") await dispatch(getPost(1));
    else await dispatch(getSavedPost(1));
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleSavePost: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleSavePost: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleSavePost: true } });
    // dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleSavePost: false } });
    const errRes = error.response;
    console.log(errRes);
  }
};
