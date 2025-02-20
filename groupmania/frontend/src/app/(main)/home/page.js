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
    comment: [],
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [id, setId] = useState(1);

  //update description to post stream content
  const postDescription = (value) => {
    // console.log(value);
    setUserPost({
      ...userPost,
      id: 1,
      description: value,
      uploadedImage: userPost.uploadedImage ?? "",
    });
  };

  //update image to post stream content
  const postImage = (files) => {
    setUserPost({
      ...userPost,
      id: id,
      uploadedImage: files.length > 0 ? URL.createObjectURL(files[0]) : null,
    });
  };

  //create new post item
  const newPostItem = (e) => {
    e.preventDefault();
    setPosts([...posts, userPost]);
    //reset the user form
    setUserPost({
      id: id,
      username: "",
      img: "",
      description: "",
      uploadedImage: "",
      comment: "",
    });
  };

  const postComment = (value) => {
    console.log(value);
    setComment({
      comment: comment,
    });

    // const updatedPosts = [...posts];
    // const latestPost = updatedPosts[updatedPosts.length - 1];
    // if (latestPost) {
    //   latestPost.comment = [...latestPost.comment, value];
    //   setPosts(updatedPosts);
    // }
    //reset the comment form
  };

  return (
    <div className="homePage_content">
      <CreatePost
        userPost={userPost}
        postDescription={postDescription}
        postImage={postImage}
        newPostItem={newPostItem}
      />
      <PostStream posts={posts} postComment={postComment} />
    </div>
  );
}

export default HomePage;
