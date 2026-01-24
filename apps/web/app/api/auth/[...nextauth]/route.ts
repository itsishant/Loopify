import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store the Google user info in your backend
      if (account?.provider === "google" && user.email) {
        try {
          console.log("🔄 Calling backend to store user...");
          const response = await fetch(
            "http://localhost:5000/api/v1/auth/google-signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                googleId: profile?.sub || user.id,
                name: user.name,
              }),
            },
          );

          if (!response.ok) {
            console.error("Backend response not ok:", response.status);
            return false;
          }

          const data = await response.json();
          console.log("✅ User stored in backend. Token:", data.token);

          // Store token in user object for JWT callback
          if (data.token) {
            (user as any).jwtToken = data.token;
          }
          return true;
        } catch (error) {
          console.error("❌ Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user && "jwtToken" in user) {
        token.jwtToken = (user as any).jwtToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && "jwtToken" in token) {
        session.user = session.user || {};
        (session.user as any).jwtToken = token.jwtToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
