"use client";

import { useState } from "react";

import CreatePost from "@/components/CreatePost/CreatePost";
import PostStream from "@/components/PostStream/PostStream";

function HomePage() {
  //user create form
  const [createUserPost, setCreateUserPost] = useState({
    username: "",
    img: "",
    description: "",
    uploadedImage: "",
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);

  //update username to post stream content
  const postUsername = (value) => {
    setCreateUserPost({
      ...createUserPost,
      username: value,
    });
  };

  //update description to post stream content
  const postDescription = (value) => {
    setCreateUserPost({
      ...createUserPost,
      description: value,
    });
  };

  //update image to post stream content

  const postImage = (value) => {
    console.log("test photo");
    setCreateUserPost({
      ...createUserPost,
      uploadedImage: value,
    });
  };

  //create new post item

  const newPostItem = () => {
    console.log("test post");
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
        postUsername={postUsername}
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
