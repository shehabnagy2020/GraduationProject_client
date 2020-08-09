import { REDUX_CLEAR } from "../CONSTANTS";
import * as $ from "jquery";
import { toast } from "react-toastify";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_CLEAR,
  });
  if (!toast.isActive("clearToast"))
    toast.warn("Session expried", { toastId: "clearToast" });
  $(".modal-backdrop").remove();
  $(".modal").removeClass("show");
};
