import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (id, post_id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteComment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/comment/remove",
      method: "DELETE",
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res.data);
    toast.success("Comment deleted successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteComment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteComment: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteComment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteComment: true } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the comment");
    }
  }
};
