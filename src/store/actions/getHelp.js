import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelp: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/help/getAllFor",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    console.log(res);
    dispatch({
      type: REDUX_HELP,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getHelp: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelp: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getHelp: true } });
    // dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelp: false } });
    const errRes = error.response;
    console.log(errRes);
  }
};
