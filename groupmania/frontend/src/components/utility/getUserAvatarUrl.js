export const getUserAvatarUrl = (userAvatar) => {
  return userAvatar
    ? `${process.env.NEXT_PUBLIC_BACKEND_API}/images/${userAvatar}`
    : "/assets/annoymous_avatar.avif.jpg";
};
