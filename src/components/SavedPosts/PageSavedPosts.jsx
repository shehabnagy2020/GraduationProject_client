import React, { useEffect } from "react";

import Header from "../Header/Header";

import SectionPosts from "./SectionPosts";
import { useDispatch, useSelector } from "react-redux";
import PageSpinner from "../Loaders/PageSpinner";
import AddPost from "../Modals/AddPost/AddPost";
import "bootstrap";
import getSavedPost from "../../store/actions/getSavedPost";
import SectionInfo from "../Home/SectionInfo";

const PageSavedPosts = () => {
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSavedPost(1));
  }, []);

  return (
    <>
      {(pageLoaders.getSavedPost ||
        pageLoaders.deletePost ||
        pageLoaders.toggleSavePost) && <PageSpinner />}
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block">
            <SectionInfo />
          </div>
          <div className="col-12 col-lg-8">
            <SectionPosts />
          </div>
        </div>
        <AddPost />
      </div>
    </>
  );
};

export default PageSavedPosts;
