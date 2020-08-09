import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_IS_LOGED,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { login: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/login",
      method: "PUT",
      data: convertToFormData(user),
    });
    dispatch({
      type: REDUX_USER,
      value: { ...res.data },
    });
    dispatch({
      type: REDUX_IS_LOGED,
      value: true,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { login: 0 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { login: false } });
  } catch (error) {
    // dispatch({ type: REDUX_PAGE_ERRORS, value: { login: 1 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { login: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to login");
    }
    console.log(errRes);
  }
};
