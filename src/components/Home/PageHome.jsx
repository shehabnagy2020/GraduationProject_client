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
import {
  REDUX_POST,
  REDUX_PAGE_HELPERS,
  REDUX_ACTIVE_COURSE,
} from "../../store/CONSTANTS";
import getRecentAssignments from "../../store/actions/getRecentAssignments";
import getPost from "../../store/actions/getPost";

const PageHome = () => {
  const dispatch = useDispatch();
  const { pageLoaders, coursesArr, activeCourse, userDetails } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(getRecentAssignments());
    return (_) => {
      dispatch({
        type: REDUX_POST,
        value: { data: [], hasMore: true },
      });
      dispatch({
        type: REDUX_PAGE_HELPERS,
        value: { page: 1 },
      });
    };
  }, []);

  useEffect(() => {
    if (coursesArr.length >= 1) {
      dispatch(getPost(1));
      if (!activeCourse.code) {
        let type = userDetails.role_type == "assistant" ? 1 : 2;
        for (let i = 0; i < coursesArr.length; i++) {
          const element = coursesArr[i];
          if (!element.is_blocked) {
            dispatch({
              type: REDUX_ACTIVE_COURSE,
              value: { ...element, type },
            });
            break;
          }
        }
      }
    }
  }, [coursesArr]);
  return (
    <>
      {(pageLoaders.getPost ||
        pageLoaders.getComment ||
        pageLoaders.deleteComment ||
        pageLoaders.addComment ||
        pageLoaders.deletePost ||
        pageLoaders.downloadZIP ||
        pageLoaders.toggleSavePost) && <PageSpinner />}
      <Header isSearch={true} />
      <div className="container">
        {coursesArr.length >= 1 && (
          <button
            className="add-post-btn"
            data-toggle="modal"
            data-target="#createPostModal"
          >
            <i className="fa fa-plus"></i>
          </button>
        )}
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
