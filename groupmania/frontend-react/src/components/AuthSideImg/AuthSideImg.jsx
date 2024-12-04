import HandsTogether from "../../assets/hands_together.webp";
import "../../components/main.scss";

const image_hands = HandsTogether;

function AuthSideImg() {
  return (
    <div className="authSidePoster">
      <img src={image_hands} alt="Hands_Together"></img>
    </div>
  );
}

export default AuthSideImg;
