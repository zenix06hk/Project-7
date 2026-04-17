import './authSideImg.scss';
import Image from 'next/image';

function AuthSideImg() {
  return (
    <div
      className="authSideImg"
      style={{
        position: 'relative',
        width: '50%',
        height: '946px',
        border: '3px solid red',
      }}
    >
      <Image src="/assets/hands_together.webp" fill alt="hands_together" />
    </div>
  );
}

export default AuthSideImg;
