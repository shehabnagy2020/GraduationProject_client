import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CDN } from "../../store/CONSTANTS";
import toggleSavePost from "../../store/actions/toggleSavePost";
import moment from "moment";
import getPost from "../../store/actions/getPost";
import InfiniteScroll from "react-infinite-scroll-component";
import deletePost from "../../store/actions/deletePost";
import downloadZIP from "../../store/actions/downloadZIP";
import * as $ from "jquery";
import "bootstrap";
import EditPost from "../Modals/EditPost/EditPost";
import { useState } from "react";

const SectionPosts = () => {
  const { postArr, userDetails, pageHelpers } = useSelector((state) => state);
  const [postItem, setPostItem] = useState({});
  const dispatch = useDispatch();

  const handleFile = (files, data_type) => {
    if (
      data_type === "multiple" ||
      data_type === "application" ||
      data_type === "text"
    ) {
      return (
        <div className="file-array">
          {files.map((item, index) => (
            <div key={index} className="file">
              <span>{item.name}</span>
              <a download target="_blank" href={`${CDN}/${item.data}`}>
                <i className="fa fa-download"></i>
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      if (data_type === "image") return <img src={`${CDN}/${files[0].data}`} />;
      else if (data_type === "video")
        return <video src={`${CDN}/${files[0].data}`} controls />;
      else if (data_type === "audio")
        return <audio src={`${CDN}/${files[0].data}`} controls />;
    }
  };

  const fetchData = (_) => {
    dispatch(getPost(pageHelpers.page));
  };

  const handleEditModal = (item) => {
    setPostItem({ ...item });
    $("#editPostModal").modal("show");
  };

  return (
    <div className="home-posts-container">
      <InfiniteScroll
        dataLength={postArr.data.length} //This is important field to render the next data
        next={fetchData}
        hasMore={postArr.hasMore}
      >
        {postArr.data.length >= 1 ? (
          postArr.data.map((item, index) => (
            <div key={index} className="home-post">
              <div className="post-header">
                <div className="profile-pic-container size-70">
                  {item.owner && item.owner.profile_image ? (
                    <img src={`${CDN}/${item.owner.profile_image}`} />
                  ) : (
                    <>
                      {userDetails.name && (
                        <div>{userDetails.name.substr(0, 2)}</div>
                      )}
                    </>
                  )}
                </div>
                <div className="post-content">
                  {item.owner && <h2>{item.owner.name}</h2>}
                  <span>{moment(item.date).fromNow()}</span>
                </div>
                {item.owner && userDetails.code === item.owner.code && (
                  <div className="post-menu">
                    <div className="dropdown">
                      <div
                        className="dropdown-toggle without"
                        data-toggle="dropdown"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </div>
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={(_) => handleEditModal(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={(_) => dispatch(deletePost(item.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="post-body">
                <p>{item.content}</p>
                {item.files &&
                  item.files.length >= 1 &&
                  handleFile(item.files, item.data_type)}
              </div>
              <div className="post-comment-indicator">
                <span>20 comment</span>
              </div>
              <div className="post-footer">
                <button className="post-btn">
                  <i className="fa fa-comment"></i>
                  comment
                </button>
                {item.files && item.files.length >= 1 && (
                  <button
                    className={`post-btn ${item.is_saved ? "active" : ""}`}
                    onClick={(_) => dispatch(downloadZIP(item.files))}
                  >
                    <i className="fa fa-save"></i>
                    download
                  </button>
                )}
                <button
                  className={`post-btn ${item.is_saved ? "active" : ""}`}
                  onClick={(_) => dispatch(toggleSavePost(item.id, "post"))}
                >
                  <i className="fa fa-save"></i>
                  save
                </button>
              </div>
              {/* <div className="comment-container">
                <div className="comment-list">
                  <div className="comment-item">
                    <div className="pic">st</div>
                    <div className="content-container">
                      <h3>saad tarek</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum molestias adipisci, porro odit{" "}
                      </p>
                      <span>3hrs</span>
                    </div>
                  </div>
                  <div className="comment-item">
                    <div className="pic">st</div>
                    <div className="content-container">
                      <h3>saad tarek</h3>
                      <p>
                        etur adipisicing elit. Voluptatum molestias adipisci,
                        porro odit{" "}
                      </p>
                      <span>3hrs</span>
                    </div>
                  </div>
                </div>

                <form className="comment-input-container">
                  <div className="profile-pic-container size-50">
                    {userDetails.profile_image ? (
                      <img src={`${CDN}/${userDetails.profile_image}`} />
                    ) : (
                      <>
                        {userDetails.name && (
                          <div>{userDetails.name.substr(0, 2)}</div>
                        )}
                      </>
                    )}
                  </div>
                  <textarea
                    rows="2"
                    className="input"
                    placeholder="Enter your comment"
                  ></textarea>
                  <button className="btn">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </form>
                <div className="comment-list"></div>
              </div> */}
            </div>
          ))
        ) : (
          <div className="empty-container">
            <p>there are no posts</p>
          </div>
        )}
      </InfiniteScroll>
      <EditPost post={postItem} />
    </div>
  );
};

export default SectionPosts;
