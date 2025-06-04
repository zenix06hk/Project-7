"use client";

import { SessionProvider } from "next-auth/react";
// import { LoginBtn } from "../LoginBtn/LoginBtn";

function AuthProviders({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      // Default base path if your app lives at the root "/"
      basePath="/"
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <LoginBtn {...children} />
    </SessionProvider>
  );
}

export default AuthProviders;

// import { SessionProvider } from "next-auth/react"

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }
