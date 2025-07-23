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
    comments: [],
    id: 1,
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(1);

  //update description to post stream content
  const postDescription = (value) => {
    console.log(value);
    setUserPost({
      ...userPost,
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

  // Prevent posting if both uploadedImage and description are empty
  const canPost =
    userPost.description.trim() !== "" ||
    (userPost.uploadedImage && userPost.uploadedImage !== "");

  //create new post item
  const newPostItem = (e) => {
    e.preventDefault();
    if (!canPost) return;

    // Create timestamp in DD/MM/YYYY T HH:MM:SS format
    const now = new Date();
    const timestamp =
      now.toLocaleDateString("en-GB") +
      " T " +
      now.toLocaleTimeString("en-GB", { hour12: false });

    const newPost = {
      ...userPost,
      timestamp: timestamp,
      id: id,
    };

    setPosts([...posts, newPost]);
    //reset the user form
    setUserPost({
      username: "",
      img: "",
      description: "",
      uploadedImage: "",
      comments: [],
    });
    setId(id + 1);
  };

  const postComment = (value, id) => {
    console.log(value);
    const updatePostWithComment = posts.map((item) => {
      if (item.id === id) {
        console.log(item);
        // Ensure comments array exists, if not create it
        const currentComments = item.comments || [];
        const newComments = [...currentComments, { comment: value, id: id }];
        return {
          ...item,
          comments: newComments,
        };
      }

      return item;
    });
    setPosts(updatePostWithComment);
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
