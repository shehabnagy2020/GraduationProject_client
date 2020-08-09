import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import { toast } from "react-toastify";
import getPost from "./getPost";
import getSavedPost from "./getSavedPost";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (id, isSavedPost) => async (dispatch, getState) => {
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
    if (isSavedPost) await dispatch(getSavedPost(1));
    else await dispatch(getPost(1));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deletePost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deletePost: false } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the post");
    }
  }
};
