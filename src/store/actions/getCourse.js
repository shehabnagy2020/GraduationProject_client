import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_ACTIVE_COURSE,
} from "../CONSTANTS";
import getPost from "./getPost";

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getAllFor",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    if (res.data && res.data.length >= 1) {
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        if (!element.is_blocked) {
          await dispatch({
            type: REDUX_ACTIVE_COURSE,
            value: { ...element, type: 1 },
          });
          await dispatch(getPost(1));
          break;
        }
      }
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: true } });
    const errRes = error.response;
    console.log(errRes);
  }
};
