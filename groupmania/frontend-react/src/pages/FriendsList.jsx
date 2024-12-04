import React from "react";

//Style: components and pages
import "../components/main.scss";
import "../pages/main.css";

//Components

import FriendsList from "../components/FriendsList/FriendsList";

function FriendsListPage() {
  return <div className="HeaderLayout">{<FriendsList />}</div>;
}

export default FriendsListPage;
