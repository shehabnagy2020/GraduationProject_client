import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";
import clearAll from "./clearAll";
import { toast } from "react-toastify";
import { capitalizeSentence } from "../../utils/helper";

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
    toast.success("help request deleted successfully");
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteHelp: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteHelp: false } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the help request");
    }
  }
};
