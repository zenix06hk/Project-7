import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./friendsList.scss";

{
  /*use map function friends list*/
}
function FriendsList() {
  return (
    <>
      <h1>Friends</h1>
      <div className="friendsList_container">
        <Link href="/">
          <div className="friendsList_itemBox">
            <Image
              src="/assets/profile_image.jpg"
              alt="icon"
              width={80}
              height={80}
              className="friends_profileImg"
            />
            <p>Thomas Philip</p>
          </div>
        </Link>
        <div className="friendsList_status">
          <Button variant="contained" size="small">
            Add
          </Button>
          <Button variant="outlined" size="small">
            Unfriend
          </Button>
        </div>
      </div>
    </>
  );
}

export default FriendsList;
