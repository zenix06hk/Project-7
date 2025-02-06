"use client";

import { useState } from "react";

import CreatePost from "@/components/CreatePost/CreatePost";
import PostStream from "@/components/PostStream/PostStream";

function HomePage() {
  //user create form
  const [userPost, setUserPost] = useState({
    username: "",
    img: "",
    description: "",
    uploadedImage: "",
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);

  //update username to post stream content
  // const postUsername = (value) => {
  //   setUserPost({
  //     ...createUserPost,
  //     username: value,
  //   });
  // };

  //update description to post stream content
  const postDescription = (value) => {
    // console.log("test description");
    setUserPost({
      ...userPost,
      description: value,
      uploadedImage: userPost.uploadedImage ?? "",
    });
  };

  //update image to post stream content

  const postImage = (files) => {
    // console.log("test photo");
    // console.log(URL.createObjectURL(files[0]));
    setUserPost({
      ...userPost,
      uploadedImage: URL.createObjectURL(files[0]),
    });
  };

  //create new post item

  const newPostItem = (e) => {
    // console.log(e.target);
    //update the latest post stream
    setPosts([...posts, userPost]);
    //reset the user form
    setUserPost({
      img: "",
      description: "",
      uploadedImage: "",
    });
  };

  const postComment = (value) => {
    // console.log(e.target);
    //update the latest post stream
    setPosts([...comment]);
    //reset the user form
    setComment({
      comment: value,
    });
  };

  return (
    <div className="homePage_content">
      <CreatePost
        userPost={userPost}
        postDescription={postDescription}
        postImage={postImage}
        newPostItem={newPostItem}
      />
      {/* post update from CreatePost submitted */}
      <PostStream posts={posts} postComment={postComment} />
    </div>
  );
}

export default HomePage;
