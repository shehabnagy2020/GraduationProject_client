import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_ASSIGNMENTS,
  REDUX_PAGE_HELPERS,
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_RECENT_ASSIGNMENTS,
} from "../CONSTANTS";

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentAssignments: true } });
  let isStudent = getState().userDetails.role_type === "student";
  try {
    const res = await Axios({
      baseURL: API,
      url: `/${
        isStudent ? "assignmentForStudents" : "assignmentForTeachStuff"
      }/getAll`,
      method: "GET",
      params: { page: 1 },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_RECENT_ASSIGNMENTS,
      value: res.data,
    });
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { getRecentAssignments: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getRecentAssignments: false },
    });
  } catch (error) {
    const errRes = error.response;
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { getRecentAssignments: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getRecentAssignments: true },
    });
  }
};
