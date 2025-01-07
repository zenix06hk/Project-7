"use client";

import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

import "./friendsList.scss";

{
  /*use map function friends list*/
}

const color = red[500];

function FriendsList() {
  return (
    <>
      <h1>Friends</h1>
      <div className="friendsList_container">
        <div className="friendsList_itemBox">
          <Link href="/">
            <Image
              src="/assets/profile_image.jpg"
              alt="icon"
              width={60}
              height={60}
              className="friendsList_profileImg"
            />
          </Link>
          <Link href="/">
            <p>Thomas Philip</p>
          </Link>
        </div>
        <div className="friendsList_status">
          <Button variant="contained" size="small" color="salmon">
            Add
          </Button>
          <Button variant="outlined" size="small" color="red">
            Unfriend
          </Button>
        </div>
      </div>
    </>
  );
}

export default FriendsList;
