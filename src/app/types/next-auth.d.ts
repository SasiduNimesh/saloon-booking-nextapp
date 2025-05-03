//import NextAuth from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "owner" | "customer";
    };
  }

  interface User {
    id: string;
    email: string;
    role: "owner" | "customer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "owner" | "customer";
  }
}
