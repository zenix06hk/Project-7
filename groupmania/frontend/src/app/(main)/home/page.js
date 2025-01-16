"use client";

import { useState } from "react";

import CreatePost from "@/components/CreatePost/CreatePost";
import PostStream from "@/components/PostStream/PostStream";

function HomePage() {
  //user create form
  const [createUserPost, setCreateUserPost] = useState({
    name: "",
    img: "",
    description: "",
    uploadedImage: "",
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);

  //update the post stream content
  const postDescription = (item) => {
    setCreateUserPost({
      ...createUserPost,
      // description: "",
    });
  };

  //update the post image

  const postImage = (item) => {
    setCreateUserPost({
      ...createUserPost,
      uploadedImage: item,
    });
  };

  //create new post item

  const newPostItem = () => {
    //update the latest post stream
    setPosts([...posts, createUserPost]);
    //reset the user form
    setCreateUserPost({
      ...createUserPost,
      // description: "",
      uploadedImage: "",
    });
  };

  return (
    <div className="homePage_content">
      <CreatePost
        createUserPost={createUserPost}
        postDescription={postDescription}
        postImage={postImage}
        newPostItem={newPostItem}
      />
      {/* post update from CreatePost submitted */}
      <PostStream posts={posts} />
    </div>
  );
}

export default HomePage;
