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
import getSavedPost from "./getSavedPost";

export default (obj, setState, isSavedPost) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editPost: true } });
  const activeCourse = getState().activeCourse;
  obj.course_code = activeCourse.code;
  obj.type = activeCourse.type;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/post/edit",
      method: "PUT",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(isSavedPost);
    toast.success("Post edited successfully");
    $("#editPostModal").modal("hide");
    setState({
      content: "",
      files: [],
      files_name: [],
    });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editPost: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editPost: false } });
    if (isSavedPost) await dispatch(getSavedPost(1));
    else await dispatch(getPost(1));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editPost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editPost: false } });
    toast.error("Failed to edit post");
  }
};
