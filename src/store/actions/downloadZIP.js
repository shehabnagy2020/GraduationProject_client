import Axios from "axios";
import { API, REDUX_PAGE_LOADERS, REDUX_PAGE_ERRORS } from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

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
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { downloadZIP: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { downloadZIP: false } });
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to download the files");
    }
  }
};
