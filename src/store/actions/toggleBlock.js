import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import clearAll from "./clearAll";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
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
    toast.success(res.data.message);
    // dispatch(getBlockData(obj));
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { toggleBlock: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { toggleBlock: false } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to do the operation, try again");
    }
  }
};
