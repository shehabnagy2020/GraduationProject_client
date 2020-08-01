import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import { toast } from "react-toastify";
import * as $ from "jquery";
import getPost from "./getPost";

const downloadURI = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default (files) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { downloadZIP: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/downloadZIP",
      method: "PUT",
      data: { files },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    downloadURI(res.data.data, res.data.name);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { downloadZIP: false } });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { downloadZIP: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { downloadZIP: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { downloadZIP: false } });
    toast.error("Failed to download the files");
  }
};
