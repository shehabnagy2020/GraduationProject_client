import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import getAssignments from "./getAssignments";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { deleteAssignment: true },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForTeachStuff/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { deleteAssignment: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deleteAssignment: false },
    });
    toast.success("Assignment deleted successfully");
    await dispatch(getAssignments(1));
  } catch (error) {
    const errRes = error.response;
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { deleteAssignment: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deleteAssignment: false },
    });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the assignment");
    }
  }
};
