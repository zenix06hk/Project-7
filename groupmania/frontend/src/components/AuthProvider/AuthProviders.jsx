"use client";

import { SessionProvider } from "next-auth/react";

function AuthProviders({ children }) {
  <SessionProvider>{children}</SessionProvider>;
}

export default AuthProviders;
