import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt";

type DBUser = {
  userId: number;
  email: string;
  password: string;
  role: "owner" | "customer";
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;

        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const users = rows as DBUser[];
        const user = users[0];

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.userId.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as "owner" | "customer";
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "owner" | "customer";
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
