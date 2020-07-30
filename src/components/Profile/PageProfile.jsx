import React, { useEffect } from "react";

import Header from "../Header/Header";
import SectionInfo from "./SectionInfo";
import { useDispatch, useSelector } from "react-redux";
import PageSpinner from "../Loaders/PageSpinner";
import "bootstrap";
import ChangePassword from "../Modals/ChangePassword/ChangePassword";

const PageProfile = () => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector((state) => state);

  // useEffect(() => {
  //   dispatch(getCourse());
  // }, []);

  return (
    <>
      {pageLoaders.toggleSavePost && <PageSpinner />}
      <Header />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12">
            <SectionInfo />
          </div>
        </div>
      </div>
      <ChangePassword />
    </>
  );
};

export default PageProfile;
