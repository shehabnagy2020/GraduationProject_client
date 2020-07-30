import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_SOLVERS,
} from "../CONSTANTS";
import getAssignmentsSolvers from "./getAssignmentsSolvers";
import * as $ from "jquery";
import { toast } from "react-toastify";

export default (obj, setMark) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { assignMark: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForTeachStuff/assignMark",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { assignMark: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { assignMark: false },
    });
    setMark("");
    $("#showAssignmentModal").modal("hide");
    toast.success("Assignment marked successfully");
    await dispatch(getAssignmentsSolvers(1, obj.assignment_id));
  } catch (error) {
    const errRes = error.response;
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { assignMark: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { assignMark: false },
    });
    if (errRes && errRes.data) {
      if (errRes.data.message === "given mark is greater than total mark")
        toast.error("given mark is greater than total mark");
    } else {
      toast.error("Failed to assign mark for the assignment");
    }
  }
};
