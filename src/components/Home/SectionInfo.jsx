import React from "react";
import { useSelector } from "react-redux";
import { CDN } from "../../store/CONSTANTS";
import { Link } from "react-router-dom";

const SectionInfo = () => {
  const { userDetails } = useSelector((state) => state);
  return (
    <div class="home-student-container">
      <div class="st-container">
        <div className="profile-pic-container size-100 mb-2">
          {userDetails.profile_image ? (
            <img src={`${CDN}/${userDetails.profile_image}`} />
          ) : (
            <>
              {userDetails.name && <div>{userDetails.name.substr(0, 2)}</div>}
            </>
          )}
        </div>

        <div class="st-content">
          <p>{userDetails.name}</p>
          <p>{userDetails.role_type}</p>
          {userDetails.department && <p>{userDetails.department.name}</p>}
        </div>
      </div>
      <Link to="/saved-posts" style={{ textDecoration: "none" }}>
        <div class="saved-posts-left">saved posts</div>
      </Link>
    </div>
  );
};

export default SectionInfo;
