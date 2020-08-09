import { REDUX_CLEAR } from "../CONSTANTS";
import * as $ from "jquery";
import { toast } from "react-toastify";

export default (obj, setState) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_CLEAR,
  });
  toast.warn("Session expried");
  $(".modal-backdrop").remove();
  $(".modal").removeClass("show");
};
