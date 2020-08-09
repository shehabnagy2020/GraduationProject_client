import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import getAssignments from "./getAssignments";
import { toast } from "react-toastify";
import * as $ from "jquery";
import clearAll from "./clearAll";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editAssignment: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForTeachStuff/edit",
      method: "PUT",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { editAssignment: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { editAssignment: false },
    });
    toast.success("Assignment edited successfully");
    setState({
      content: "",
      course_code: "",
      total_mark: "",
      deadline: "",
      files: [],
      files_name: [],
    });
    $("#editAssignmentModal").modal("hide");
    await dispatch(getAssignments(1));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { editAssignment: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { editAssignment: false },
    });
    toast.success("Failed to edit assignment");
  }
};
