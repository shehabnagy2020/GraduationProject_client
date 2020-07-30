import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_IS_LOGED,
} from "../CONSTANTS";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/logout",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: {},
    });
    dispatch({
      type: REDUX_IS_LOGED,
      value: false,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: 0 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: true } });
  }
};