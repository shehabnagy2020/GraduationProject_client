import React, { useEffect } from "react";

import Header from "../Header/Header";
import SectionInfo from "./SectionInfo";
import SectionAssignment from "./SectionAssignment";
import SectionCourses from "./SectionCourses";
import SectionPosts from "./SectionPosts";
import { useDispatch, useSelector } from "react-redux";
import PageSpinner from "../Loaders/PageSpinner";
import AddPost from "../Modals/AddPost/AddPost";
import "bootstrap";
import { Scrollbars } from "react-custom-scrollbars";

const PageHome = () => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector((state) => state);

  return (
    <>
      {(pageLoaders.getPost ||
        pageLoaders.deletePost ||
        pageLoaders.toggleSavePost) && <PageSpinner />}
      <Header />
      <div className="container">
        <button
          className="add-post-btn"
          data-toggle="modal"
          data-target="#createPostModal"
        >
          <i className="fa fa-plus"></i>
        </button>
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block">
            <SectionInfo />
            <SectionAssignment />
          </div>
          <div className="col-12 col-lg-8" style={{ height: "85vh" }}>
            <Scrollbars autoHide style={{ height: "100%" }}>
              <SectionCourses />
              <SectionPosts />
            </Scrollbars>
          </div>
        </div>
        <AddPost />
      </div>
    </>
  );
};

export default PageHome;
