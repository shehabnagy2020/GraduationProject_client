import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ALL_COURSES,
} from "../CONSTANTS";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllCourses: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_ALL_COURSES,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAllCourses: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllCourses: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAllCourses: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllCourses: true } });
    const errRes = error.response;
    console.log(errRes);
  }
};