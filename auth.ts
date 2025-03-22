import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      // Check if the user's email matches the allowed email
      if (user.email !== process.env.ALLOWED_EMAIL) {
        // If email doesn't match, return false to reject the sign-in
        return false;
      }
      // If email matches, allow sign-in
      return true;
    },
    async session({ session, user }) {
      // Optionally, attach the user data to the session object
      session.user = user;
      return session;
    },
  },
})