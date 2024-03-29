import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { register: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/register",
      method: "POST",
      data: convertToFormData(user),
    });
    dispatch({
      type: REDUX_USER,
      value: { ...res.data },
    });
    toast.success("account created but not appreoved yet");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { register: 0 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { register: false } });
  } catch (error) {
    // dispatch({ type: REDUX_PAGE_ERRORS, value: { register: 1 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { register: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to register");
    }
    console.log(errRes);
  }
};
