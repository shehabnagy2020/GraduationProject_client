import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_SOLVERS,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import getAssignments from "./getAssignments";
import { toast } from "react-toastify";

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
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { deleteAssignment: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deleteAssignment: true },
    });
    toast.success("Faild to delete assignment");
  }
};
