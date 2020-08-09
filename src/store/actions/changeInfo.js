import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/change-info",
      method: "PUT",
      data: convertToFormData(user),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_USER,
      value: { ...res.data },
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: 0 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
    toast.success("Information updated successfully");
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: 1 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to change use info");
    }
  }
};
