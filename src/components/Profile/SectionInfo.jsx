import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDN, VALIDATION } from "../../store/CONSTANTS";
import changeInfo from "../../store/actions/changeInfo";
import IconEmail from "../../assets/images/email-icon.png";
import IconPhone from "../../assets/images/phone-icon.png";
import IconUser from "../../assets/images/user-icon.png";

const SectionInfo = () => {
  const { userDetails, pageLoaders, pageErrors } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    name: "",
    phone: "",
    profile_image: "",
    profile_image_text: "",
  });
  const ref = useRef(null);
  useEffect(() => {
    let profile_image_text = "",
      newData = { ...userDetails };
    if (userDetails.profile_image) {
      profile_image_text = CDN + "/" + userDetails.profile_image;
      delete newData.profile_image;
    }
    setState({ ...newData, profile_image_text });
  }, [userDetails]);
  const [errorState, setErrorState] = useState({
    email: false,
    phone: false,
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
    if (VALIDATION[id].test(val)) {
      setErrorState({ ...errorState, [id]: false });
    } else {
      setErrorState({ ...errorState, [id]: true });
    }
    setState({ ...state, [id]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      let obj = {
        name: state.name,
        email: state.email,
        phone: state.phone,
      };
      if (state.profile_image) obj.profile_image = state.profile_image;
      dispatch(changeInfo(obj));
    }
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = async function () {
        let base64 = reader.result;
        setState({ ...state, profile_image_text: base64, profile_image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="home-student-container">
      <div class="st-container">
        <div
          className="profile-pic-container size-100 mb-2"
          style={{ cursor: "pointer" }}
          onClick={(_) => ref.current.click()}
        >
          {state.profile_image_text ? (
            <img src={state.profile_image_text} />
          ) : (
            <>
              {userDetails.name && <div>{userDetails.name.substr(0, 2)}</div>}
            </>
          )}
          <input
            ref={ref}
            accept="image/*"
            type="file"
            onChange={handleFile}
            style={{
              display: "none",
            }}
          />
        </div>

        <form class="st-content" onSubmit={handleSubmit}>
          <div>
            <p>{userDetails.role_type}</p>
            {userDetails.department && <p>{userDetails.department.name}</p>}
            {userDetails.grade_year && <p>{userDetails.grade_year.name}</p>}

            <button
              className="btn btn-danger btn-sm"
              data-target="#changePasswordModal"
              data-toggle="modal"
              type="button"
            >
              Change Password
            </button>
          </div>

          <div className="info-box my-4">
            <div className="form-control-container">
              <div className="form-control">
                <img src={IconEmail} alt="" />
                <input
                  required
                  onChange={handleInputValidated}
                  value={state.email}
                  type="email"
                  id="email"
                />
              </div>
              {errorState.email && (
                <div className="text-error">
                  must be like example@example.com
                </div>
              )}
            </div>
            <div className="form-control-container">
              <div className="form-control">
                <img src={IconUser} alt="" />
                <input
                  required
                  onChange={handleInputValidated}
                  value={state.name}
                  type="text"
                  id="name"
                />
              </div>
              {errorState.name && (
                <div className="text-error">must be 3 characters at least</div>
              )}
            </div>

            <div className="form-control-container">
              <div className="form-control">
                <img src={IconPhone} alt="" />
                <input
                  required
                  onChange={handleInputValidated}
                  value={state.phone}
                  type="tel"
                  id="phone"
                />
              </div>
              {errorState.phone && (
                <div className="text-error">must be numbers only</div>
              )}
            </div>
          </div>
          {pageLoaders.changeInfo ? (
            <div className="spinner-border text-primary mx-2" />
          ) : (
            <>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SectionInfo;
