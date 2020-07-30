import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import * as $ from "jquery";

export default (user, setState, setErrorState) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/change-password",
      method: "PUT",
      data: convertToFormData(user),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: 0 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
    toast.success("password changed successfully");
    $("#changePasswordModal").modal("hide");
    setState({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setErrorState({
      old_password: false,
      new_password: false,
      confirm_password: false,
    });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: 1 } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
    if (errRes && errRes.data) {
      if (errRes.data.message === "old password is invalid")
        toast.error("old password is invalid");
    }
  }
};