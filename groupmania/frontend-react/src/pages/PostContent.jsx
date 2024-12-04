import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import PostContent from "../components/PostContent/PostContent";

function PostContentPage() {
  return (
    <div className="PostContentLayout">
      <PostContent />
    </div>
  );
}

export default PostContentPage;
