import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth"; // Used for server-side session access

// Define your NextAuth options
// This is where you configure your authentication providers, callbacks, etc.

export const authOptions = {
  // Define the authentication providers
  // Here we use CredentialsProvider for username/password login
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      // This function is called when a user attempts to sign in
      async authorize(credentials) {
        // --- YOUR BACKEND LOGIN API CALL ---
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // const data = await res.json();
          // console.log(data);

          // console.log(res)
          if (res.ok) {
            const data = await res.json();
            // Return the user object, which will be passed to the jwt callback.
            // IMPORTANT: Include your custom token here!
            return {
              id: data.user.userId,
              name: data.user.username,
              firstName: data.user.first_name, // Now correct: backend sends 'first_name'
              lastName: data.user.last_name, // Now correct: backend sends 'last_name'
              email: data.user.email,
              image: data.user.image,
              accessToken: data.token, // Store your custom token here
              // Add any other user data you want to store in the session
            };
          } else {
            // If you return null or throw an Error, the user will be sent to the error page.
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Crucial for CredentialsProvider
  },
  callbacks: {
    async jwt({ token, user }) {
      // The `user` object is what was returned from the `authorize` function.
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.image = user.image; //
        token.accessToken = user.accessToken; // Persist your custom token in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      // The `token` object is what was returned from the `jwt` callback.
      // if (token) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.image = token.image;
      session.accessToken = token.accessToken; // Expose the token to the client-side session
      // }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Redirect to your custom sign-in page
    signOut: "/signin", // Redirect to sign-in page after sign out
    error: "/error", // Custom error page
  },
  // Add your NEXTAUTH_SECRET from environment variables
  secret: process.env.NEXTAUTH_SECRET,
};

// This helper is for server components/API routes to get the session
// export function auth(...args) {
//   return getServerSession(...args, authOptions);
// }

export default NextAuth(authOptions);
