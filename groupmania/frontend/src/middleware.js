export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/friends",
    "/community",
    "/settings",
    "/events",
    "/postsaved",
    "/updateProfile",
  ],
};
