import React from "react";
import toggleSavePost from "../../store/actions/toggleSavePost";
import moment from "moment";
import deletePost from "../../store/actions/deletePost";
import downloadZIP from "../../store/actions/downloadZIP";
import deleteComment from "../../store/actions/deleteComment";
import getComment from "../../store/actions/getComment";
import { CDN } from "../../store/CONSTANTS";
import { useSelector, useDispatch } from "react-redux";
import * as $ from "jquery";
import { useState } from "react";
import addComment from "../../store/actions/addComment";
import TextareaAutosize from "react-textarea-autosize";

const PostItem = ({ item, setPostItem }) => {
  const { userDetails } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [commentText, setcommentText] = useState("");
  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText) {
      let obj = {
        content: commentText,
        post_id: item.id,
      };
      dispatch(addComment(obj));
      setcommentText("");
    }
  };
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

  const handleEditModal = (item) => {
    setPostItem({ ...item });
    $("#editPostModal").modal("show");
  };

  return (
    <div className="home-post">
      <div className="post-header">
        <div className="profile-pic-container size-70">
          {item.owner && item.owner.profile_image ? (
            <img src={`${CDN}/${item.owner.profile_image}`} />
          ) : (
            <>
              {item.owner && item.owner.name && (
                <div>{item.owner.name.substr(0, 2)}</div>
              )}
            </>
          )}
        </div>
        <div className="post-content">
          {item.owner && <h2>{item.owner.name}</h2>}
          <span>{moment(item.date).fromNow()}</span>
        </div>
        {userDetails.code === item.owner.code &&
          userDetails.role_type == item.owner.role_type && (
            <div className="post-menu">
              <div className="dropdown">
                <div className="dropdown-toggle without" data-toggle="dropdown">
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
                    onClick={(_) => dispatch(deletePost(item.id, true))}
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
        <span>{item.comments_count} comment</span>
      </div>
      <div className="post-footer">
        <button
          className="post-btn"
          onClick={(_) => dispatch(getComment(item.id))}
        >
          <i className="fa fa-comment"></i>
          comment
        </button>
        {item.files && item.files.length >= 1 && (
          <button
            className={`post-btn `}
            onClick={(_) => dispatch(downloadZIP(item.files))}
          >
            <i className="fa fa-download"></i>
            download
          </button>
        )}
        <button
          className={`post-btn ${item.is_saved ? "active" : ""}`}
          onClick={(_) =>
            dispatch(toggleSavePost(item.id, "save", item.is_saved))
          }
        >
          <i className="fa fa-save"></i>
          save
        </button>
      </div>

      {item.comments && (
        <div className="comment-container">
          {item.comments.length >= 1 &&
            item.comments.map((comment, index) => (
              <div key={index} className="comment-list">
                <div className="comment-item">
                  {/* <div className="pic">st</div> */}
                  <div className="profile-pic-container size-50">
                    {comment.owner && comment.owner.profile_image ? (
                      <img src={`${CDN}/${comment.owner.profile_image}`} />
                    ) : (
                      <>
                        {comment.owner && comment.owner.name && (
                          <div>{userDetails.name.substr(0, 2)}</div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="content-container">
                    <h3>{comment.owner.name}</h3>
                    <p>{comment.content}</p>
                    <div className="content-footer">
                      <span>{moment(new Date(comment.date)).fromNow()}</span>
                      {userDetails.code === comment.owner.code &&
                        userDetails.role_type == comment.owner.role_type && (
                          <button
                            onClick={(_) =>
                              dispatch(deleteComment(comment.id, item.id))
                            }
                          >
                            <i className="fa fa-close"></i>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <form className="comment-input-container" onSubmit={handleAddComment}>
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
            <TextareaAutosize
              maxRows={5}
              minRows={1}
              className="input"
              placeholder="Enter your comment"
              onChange={(e) => setcommentText(e.target.value)}
              value={commentText}
            />
            <button className="btn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostItem;
