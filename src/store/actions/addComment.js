import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import clearAll from "./clearAll";
import { toast } from "react-toastify";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addComment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/comment/add",
      method: "POST",
      data: {
        ...obj,
      },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    toast.success("Comment added successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addComment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addComment: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addComment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addComment: true } });
    toast.error("Failed to add comment");
  }
};
