import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

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
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: 1 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
    if (errRes && errRes.data) {
      if (errRes.data.message === "email address already exist")
        toast.error("email address already exist");
      if (errRes.data.message === "phone already exist")
        toast.error("phone already exist");
      if (errRes.data.message === "name already exist")
        toast.error("name already exist");
    }
  }
};
