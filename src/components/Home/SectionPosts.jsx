import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import getPost from "../../store/actions/getPost";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap";
import EditPost from "../Modals/EditPost/EditPost";
import { useState } from "react";

import PostItem from "./PostItem";

const SectionPosts = () => {
  const { postArr, userDetails, pageHelpers, searchArr } = useSelector(
    (state) => state
  );
  const [postItem, setPostItem] = useState({});
  const dispatch = useDispatch();

  const fetchData = (_) => {
    dispatch(getPost(pageHelpers.page));
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
            <PostItem item={item} key={index} setPostItem={setPostItem} />
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
