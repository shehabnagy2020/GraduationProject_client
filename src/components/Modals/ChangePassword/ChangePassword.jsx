import React, { useState } from "react";
import changePassword from "../../../store/actions/changePassword";
import { useSelector, useDispatch } from "react-redux";
import * as $ from "jquery";
import { VALIDATION } from "../../../store/CONSTANTS";

const ChangePassword = () => {
  const [state, setState] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const { pageLoaders } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const checkErrors = (_) => {
    for (const key in errorState) {
      if (errorState.hasOwnProperty(key)) {
        const element = errorState[key];
        if (element) return false;
      }
    }
    return true;
  };

  const handleInputValidated = (e) => {
    const id = e.target.id,
      val = e.target.value;
    if (VALIDATION["password"].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    if (
      id === "new_password" &&
      state.confirm_password &&
      state.confirm_password !== val
    )
      setErrorState({ ...setErrorState, confirm_password: true });
    if (
      id === "confirm_password" &&
      state.new_password &&
      state.new_password !== val
    )
      setErrorState({ ...setErrorState, confirm_password: true });
    setState({ ...state, [id]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      dispatch(changePassword(state, setState, setErrorState));
    }
  };
  const handleClose = (_) => {
    setState({ old_password: "", new_password: "", confirm_password: "" });
    setErrorState({
      old_password: false,
      new_password: false,
      confirm_password: false,
    });
    $("#changePasswordModal").modal("hide");
  };

  return (
    <div
      className="modal fade"
      id="changePasswordModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form-control">
              <input
                type="password"
                placeholder="Enter your old password"
                required
                id="old_password"
                onChange={handleInputValidated}
                value={state.old_password}
              />
              {errorState.old_password && (
                <div className="text-error">
                  must be 8 characters containing numbers and uppercases
                </div>
              )}
            </div>
            <div className="modal-form-control">
              <input
                type="password"
                placeholder="Enter the new password"
                required
                id="new_password"
                onChange={handleInputValidated}
                value={state.new_password}
              />
              {errorState.new_password && (
                <div className="text-error">
                  must be 8 characters containing numbers and uppercases
                </div>
              )}
            </div>
            <div className="modal-form-control">
              <input
                type="password"
                placeholder="Enter the new password again"
                required
                id="confirm_password"
                onChange={handleInputValidated}
                value={state.confirm_password}
              />
              {errorState.confirm_password && (
                <div className="text-error">
                  must be the same as the new password
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            {pageLoaders.changePassword ? (
              <div className="spinner-border text-primary mx-2" />
            ) : (
              <button type="submit" className="btn btn-primary">
                change
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
