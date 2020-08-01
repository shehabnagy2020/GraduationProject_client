import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import { toast } from "react-toastify";
import * as $ from "jquery";
import getPost from "./getPost";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deletePost: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/post/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    toast.success("post has been deleted");
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deletePost: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deletePost: false } });
    await dispatch(getPost(1));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deletePost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deletePost: false } });
    toast.error("Failed to delete post");
  }
};
