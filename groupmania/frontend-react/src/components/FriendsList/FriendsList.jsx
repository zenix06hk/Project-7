import profileImg from "../../assets/profile_image.jpg";
const profile_Img = profileImg;

{
  /*use map function friends list*/
}
function FriendsList() {
  return (
    <div className="friendsList-container">
      <h1>Friends</h1>
      <div className="friendsList-card-container">
        <div className="friendsList-card">
          <img
            src={profile_Img}
            alt="Groupmania"
            className="friendsList-cardImg"
          ></img>
          <div className="friendsList-avatar"></div>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
