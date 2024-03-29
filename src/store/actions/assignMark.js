import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import getAssignmentsSolvers from "./getAssignmentsSolvers";
import * as $ from "jquery";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

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
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { assignMark: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { assignMark: false },
    });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to assign mark for student assignment");
    }
  }
};
