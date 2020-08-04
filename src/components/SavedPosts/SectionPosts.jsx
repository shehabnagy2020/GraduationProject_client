import React from "react";
import { useSelector, useDispatch } from "react-redux";
import getPost from "../../store/actions/getPost";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap";
import EditPost from "../Modals/EditPost/EditPost";
import { useState } from "react";
import PostItem from "./PostItem";
import { Scrollbars } from "react-custom-scrollbars";

const SectionPosts = () => {
  const { postArr, userDetails, pageHelpers } = useSelector((state) => state);
  const [postItem, setPostItem] = useState({});
  const dispatch = useDispatch();

  const fetchData = (_) => {
    dispatch(getPost(pageHelpers.page));
  };

  return (
    <div className="home-posts-container" style={{ height: "86vh" }}>
      <Scrollbars autoHide style={{ height: "100%" }}>
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
              <p>there are no saved posts</p>
            </div>
          )}
        </InfiniteScroll>
      </Scrollbars>
      <EditPost post={postItem} />
    </div>
  );
};

export default SectionPosts;
