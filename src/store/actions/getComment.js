import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_POST,
} from "../CONSTANTS";
import clearAll from "./clearAll";

export default (post_id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getComment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/comment/getAll",
      method: "GET",
      params: {
        post_id,
      },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    console.log(res.data);
    let postArr = getState().postArr;
    let data = postArr.data;
    data = data.map((i) => {
      if (i.id === post_id) return { ...i, comments: res.data };
      return { ...i };
    });
    dispatch({
      type: REDUX_POST,
      value: { ...postArr, data },
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getComment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getComment: false } });
  } catch (error) {
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getComment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getComment: true } });
  }
};
