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
import getAssignments from "./getAssignments";

export default (obj, setState, setAssignmentEdit) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { solveAssignment: true } });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForStudents/add",
      method: "POST",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    toast.success("Assignment answer has been submitted");
    dispatch({ type: REDUX_PAGE_LOADERS, value: { solveAssignment: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { solveAssignment: false } });
    $("#solveAssignmentModal").modal("hide");
    setState({ content: "", files: [], files_name: [] });
    setAssignmentEdit({});
    await dispatch(getAssignments(1, 0));
  } catch (error) {
    const errRes = error.response;
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    console.log(errRes);
    dispatch({ type: REDUX_PAGE_ERRORS, value: { solveAssignment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { solveAssignment: false } });
    toast.error("Failed to submit assignment answer");
  }
};
