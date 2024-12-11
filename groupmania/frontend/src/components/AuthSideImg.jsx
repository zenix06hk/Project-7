import HandsTogether from "../../public/assets/hands_together.webp";
import "../app/styles/main.scss";
import "../app/styles/authSideImg.scss";
import Image from "next/image";

function AuthSideImg() {
  return (
    <div
      className="authSideImg"
      // style={{ position: "relative", width: "50%", height: "100%" }}
      style={{
        position: "relative",
        width: "50%",
        height: "946px",
        border: "3px solid red",
      }}
    >
      {/* <p style={{ position: "relative", width: "400px", height: "200px" }}> */}
      <Image src="/assets/hands_together.webp" fill alt="hands_together" />
      {/* </p> */}
    </div>
  );
}

export default AuthSideImg;
