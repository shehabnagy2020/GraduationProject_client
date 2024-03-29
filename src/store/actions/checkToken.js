import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USER,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/checkToken",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_USER,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { checkToken: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { checkToken: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    } else dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: true } });
  }
};
