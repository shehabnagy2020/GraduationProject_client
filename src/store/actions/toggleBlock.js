import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import getBlockData from "./getBlockData";
import { convertToFormData } from "../../utils/helper";
import { toast } from "react-toastify";
import * as $ from "jquery";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleBlock: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/toggleBlock",
      method: "PUT",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleBlock: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleBlock: false } });
    $("#blockUnblockModal").modal("hide");
    setState({
      course_code: "",
      student_code: "",
      block_period: "",
    });
    console.log(setState);
    toast.success(res.data.message);
    // dispatch(getBlockData(obj));
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleBlock: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleBlock: false } });
    const errRes = error.response;
    console.log(errRes);
    toast.error("Failed to do the operation, try again");
  }
};
