import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import getSavedPost from "./getSavedPost";
import getPost from "./getPost";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (post_id, type, status) => async (dispatch, getState) => {
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
    toast.success(res.data.message);
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleSavePost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleSavePost: false } });
    toast.error("Failed to do the operation, try again");
  }
};
