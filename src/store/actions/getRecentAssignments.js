import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_RECENT_ASSIGNMENTS,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getRecentAssignments: true } });
  let isStudent = getState().userDetails.role_type === "student";
  let obj = { avialability_type: 0 };
  try {
    const res = await Axios({
      baseURL: API,
      url: `/${
        isStudent ? "assignmentForStudents" : "assignmentForTeachStuff"
      }/getAll`,
      method: "GET",
      params: { page: 1, ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res.data);
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
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
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
