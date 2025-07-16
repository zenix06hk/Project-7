"use client";

import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

import "./friendsList.scss";

{
  /*use map function friends list*/
}

const color = red[500];

function FriendsList() {
  // State to track friendship status
  const [isFriend, setIsFriend] = useState(false);

  // Handle button click to toggle friendship status
  const handleFriendshipToggle = () => {
    setIsFriend(!isFriend);
  };

  return (
    <>
      <h1>Friends</h1>
      <div className="friendsList__container">
        <div className="friendsList__itemBox">
          <Link href="/">
            <Image
              src="/assets/profile_image.jpg"
              alt="icon"
              width={60}
              height={60}
              className="friendsList__profileImg"
            />
          </Link>
          <Link href="/">
            <p>Thomas Philip</p>
          </Link>
        </div>
        <div className="friendsList__status">
          <Button
            variant={isFriend ? "outlined" : "contained"}
            size="small"
            color={isFriend ? "error" : "primary"}
            onClick={handleFriendshipToggle}
          >
            {isFriend ? "Unfriend" : "Add"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default FriendsList;
