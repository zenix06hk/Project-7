import React from "react";
import UserShare from "../UserShare/UserShare";
import MembersShare from "../MembersShare/MembersShare";

function PostContent() {
  return (
    <div className="postContent-container">
      <div className="postContent-top">
        <UserShare />
      </div>
      <div className="postContent-bottom">
        <MembersShare />
      </div>
    </div>
  );
}

export default PostContent;
