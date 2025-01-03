import "./community.scss";

// import profileImg from "../../assets/profile_image.jpg";
// const profile_Img = profileImg;

{
  /*use map function friends list*/
}
function FriendsList() {
  return (
    <div className="community_container">
      <h1>Community</h1>
      <div className="community_card-container">
        <div className="community_card">
          <img
            // src={profile_Img}
            alt="Groupmania"
            className="community_cardImg"
          ></img>
          <div className="community_avatar"></div>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
