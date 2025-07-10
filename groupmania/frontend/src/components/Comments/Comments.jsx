"use client";

import { useState } from "react";
import Form from "next/form";

function Comments({ id, postComment }) {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComment("");
    postComment(Comments, id);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        id="comment"
        placeholder="Comment here..."
        size="100"
        className="createPost__textfield"
        value={comment}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="createPost__button submit"
        height="30px"
        value=""
      >
        Send
      </button>
    </Form>
  );
}
export default Comments;
