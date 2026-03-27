export const getUserAvatarUrl = (userAvatar) => {
  const defaultAvatar = '/assets/annoymous_avatar.jpg';

  // Handle empty/missing values (including common stringified forms)
  if (!userAvatar) return defaultAvatar;
  if (userAvatar === 'null' || userAvatar === 'undefined') return defaultAvatar;

  // Backward-compat: older backend values used a root path that doesn't exist in Next public/
  if (userAvatar === '/annoymous_avatar.jpg' || userAvatar === 'annoymous_avatar.jpg') {
    return defaultAvatar;
  }

  // Already a full URL (e.g. CDN)
  if (/^https?:\/\//i.test(userAvatar)) return userAvatar;

  // Already an app-relative path (e.g. "/assets/annoymous_avatar.jpg")
  if (userAvatar.startsWith('/')) return userAvatar;

  // Stored filename in DB (served by backend static /images)
  return `${process.env.NEXT_PUBLIC_BACKEND_API}/images/${userAvatar}`;
};
