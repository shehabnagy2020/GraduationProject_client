import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE_STUDENTS,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default (course_code) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourseStudents: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getAllStudents",
      method: "GET",
      params: { course_code },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE_STUDENTS,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourseStudents: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourseStudents: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourseStudents: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourseStudents: true } });
  }
};
