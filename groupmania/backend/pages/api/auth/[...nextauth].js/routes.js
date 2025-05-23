import NextAuth from "next-auth";

const handlers = NextAuth();

export { handlers as GET, handlers as POST };
