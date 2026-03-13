export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/community",
    "/settings",
    "/events",
    "/postsaved",
    "/updateProfile",
  ],
};
