import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteHelp: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/help/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_HELP,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteHelp: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteHelp: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteHelp: true } });
    // dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteHelp: false } });
    const errRes = error.response;
    console.log(errRes);
  }
};
