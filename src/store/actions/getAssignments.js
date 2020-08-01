import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_ASSIGNMENTS,
  REDUX_PAGE_HELPERS,
  REDUX_ACTIVE_ASSIGNMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import getAssignmentsSolvers from "./getAssignmentsSolvers";

export default (page) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getAssignments: true } });
  dispatch({
    type: REDUX_PAGE_HELPERS,
    value: { assignmentsPage: page + 1 },
  });
  let isStudent = getState().userDetails.role_type === "student";

  try {
    const res = await Axios({
      baseURL: API,
      url: `/${
        isStudent ? "assignmentForStudents" : "assignmentForTeachStuff"
      }/getAll`,
      method: "GET",
      params: { page },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    let data = getState().assignmentsArr.data;
    let activeAssignment = getState().activeAssignment;
    let hasMore = false;
    if (page == 1) {
      if (res.data.length >= 1) {
        hasMore = res.data.length < 5 ? false : true;
        data = [...res.data];

        if (!isStudent) {
          if (activeAssignment.fromHome || activeAssignment.fromAssignments)
            dispatch(getAssignmentsSolvers(1, activeAssignment.id));
          else {
            dispatch({ type: REDUX_ACTIVE_ASSIGNMENT, value: res.data[0] });
            dispatch(getAssignmentsSolvers(1, res.data[0].id));
          }
        }
      } else {
        hasMore = false;
        data = [];
      }
    } else {
      if (res.data.length >= 1) {
        hasMore = res.data.length < 5 ? false : true;
        data = [...data, ...res.data];
      }
    }
    dispatch({
      type: REDUX_ASSIGNMENTS,
      value: { hasMore, data },
    });
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { getAssignments: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getAssignments: false },
    });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAssignments: true } });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getAssignments: true },
    });
  }
};
