"use client";

import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

import "./community.scss";

{
  /*use map function friends list*/
}

const color = red[500];

function CommunityPage() {
  // State to track community membership status
  const [isMember, setIsMember] = useState(false);

  // Handle button click to toggle membership status
  const handleMembershipToggle = () => {
    setIsMember(!isMember);
  };

  return (
    <>
      <div className="community__heading">
        <h1>Community</h1>
      </div>
      <div className="community__container">
        <Link href="/">
          <div className="community__itemBox">
            <div className="community__profileImgBox">
              <Image
                src="/assets/profile_image.jpg"
                alt="icon"
                width={60}
                height={60}
                className="community__profileImg"
              />
            </div>
            <div>
              <h3>Car lovers! </h3>
              <p>
                Community of car lovers, who wants to check the latest car, come
                and join us
              </p>
            </div>
          </div>
        </Link>
        <div className="community__status">
          <Button
            variant={isMember ? "outlined" : "contained"}
            size="small"
            color={isMember ? "error" : "primary"}
            onClick={handleMembershipToggle}
          >
            {isMember ? "Leave" : "Join"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CommunityPage;
