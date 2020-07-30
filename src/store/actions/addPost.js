import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import { toast } from "react-toastify";
import * as $ from "jquery";
import getPost from "./getPost";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addPost: true } });
  const activeCourse = getState().activeCourse;
  obj.course_code = activeCourse.code;
  obj.type = activeCourse.type;
  try {
    const res = await Axios({
      baseURL: API,
      url: "/post/add",
      method: "POST",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    toast.success("A new post has been added");
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPost: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addPost: false } });
    $("#createPostModal").modal("hide");
    setState({ content: "", files: [], files_name: [] });
    await dispatch(getPost(1));
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addPost: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPost: false } });
    const errRes = error.response;
    toast.error("Failed to add new post");
    console.log(errRes);
  }
};
