"use client";

import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

import "./events.scss";

function Events() {
  return (
    <>
      <div className="h1-test">
        <h1>Events</h1>
        <h2>test</h2>
      </div>
      <div className="events_container">
        <Link href="/">
          <div className="events_itemBox">
            <div className="events_profileImgBox">
              <Image
                src="/assets/profile_image.jpg"
                alt="icon"
                width={60}
                height={60}
                className="events_profileImg"
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
        <div className="events_status">
          <Button variant="contained" size="small" color="salmon">
            Join
          </Button>
        </div>
      </div>
    </>
  );
}

export default Events;
