import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2pbJd3Bver7XUepGhDLDg5rDLV9/.well-known/openid-configuration`,
      authorization: { params: 
        { scope: "openid email profile" },
          prompt: "login"
        },
      idToken: true,
      clientId: "P2pbJd3Bver7XUepGhDLDg5rDLV9",
      clientSecret: "K2pbnKjYfpIHJ3I5dhrhnYxJQGhdSXHr5vUFWOorLGCjGyb7WjHLrsAxfVsXdSHWqwUSZ1n",
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
    {
      id: "google",
      name: "Google",
      type: "oauth",
      clientId: "286311632607-ismn3q2a1cgsp2tuh8ed5ttq66t9ciis.apps.googleusercontent.com", // You need to set this in .env.local
      clientSecret: "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", // You need to set this in .env.local
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
