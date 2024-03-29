import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import { toast } from "react-toastify";
import * as $ from "jquery";
import clearAll from "./clearAll";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addHelp: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/help/add",
      method: "POST",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_HELP,
      value: res.data,
    });
    toast.success("A new help request has been submitted");

    dispatch({ type: REDUX_PAGE_LOADERS, value: { addHelp: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addHelp: false } });
    $("#helpModal").modal("hide");
    setState({ content: "", subject: "" });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addHelp: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addHelp: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to submit help request");
    }
  }
};
