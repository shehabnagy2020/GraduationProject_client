import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_SOLVERS,
  REDUX_PAGE_HELPERS,
  REDUX_CLEAR,
} from "../CONSTANTS";

export default (page, assignment_id) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { getAssignmentsSolvers: true },
  });
  dispatch({
    type: REDUX_PAGE_HELPERS,
    value: { AssignmentsSolversPage: page + 1 },
  });

  try {
    const res = await Axios({
      baseURL: API,
      url: "/assignmentForTeachStuff/getAllAssignSolvers",
      method: "GET",
      params: { page, assignment_id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res);
    let data = getState().solversArr.data;
    let hasMore = false;
    if (page == 1) {
      if (res.data.length >= 1) {
        hasMore = res.data.length < 5 ? false : true;
        data = [...res.data];
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
      type: REDUX_SOLVERS,
      value: { hasMore, data },
    });
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { getAssignmentsSolvers: false },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getAssignmentsSolvers: false },
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
    dispatch({
      type: REDUX_PAGE_ERRORS,
      value: { getAssignmentsSolvers: true },
    });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { getAssignmentsSolvers: true },
    });
  }
};
