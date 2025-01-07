"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import "./events.scss";

function Events() {
  return (
    <div className="event_container">
      <div>
        <h1>Events</h1>
      </div>
      <div>
        {/* <Button variant="outlined" startIcon={<AddIcon />}>
          Add
        </Button> */}
        <h1>test</h1>
      </div>
      <div className="events-card-container"></div>
    </div>
  );
}

export default Events;
