import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_SOLVERS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import getAssignments from "./getAssignments";
import * as $ from "jquery";
import { toast } from "react-toastify";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addAssignment: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForTeachStuff/add",
      method: "POST",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    setState({
      content: "",
      course_code: "",
      total_mark: "",
      deadline: "",
      files: [],
      files_name: [],
    });
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { addAssignment: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { addAssignment: false },
    });
    $("#addAssignmentModal").modal("hide");
    toast.success("Assignment added successfully");

    await dispatch(getAssignments(1));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { addAssignment: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { addAssignment: false },
    });
    toast.error("Failed to add assignment");
  }
};
