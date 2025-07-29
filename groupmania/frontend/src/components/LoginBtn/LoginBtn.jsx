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
        Signed in as {displayName} <br />
        <button onClick={() => signOut({ callbackUrl: "/signin" })}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default LoginBtn;
