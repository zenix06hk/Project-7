import { useSession, signIn, signOut } from "next-auth/react";

function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    const displayName =
      session.user.firstName && session.user.lastName
        ? `${session.user.firstName} ${session.user.lastName}`
        : session.user.name;

    return (
      <>
        {/* Signed in as {displayName} <br /> */}
        <div onClick={() => signOut({ callbackUrl: "/signin" })}>Sign out</div>
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default LoginBtn;
