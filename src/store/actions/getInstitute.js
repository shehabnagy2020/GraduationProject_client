import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_INSTITUTE,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_INSTITUTE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getInstitute: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: true } });
  }
};
