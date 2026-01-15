import type { DefaultSession } from "next-auth"
import type { User as PrismaUser } from "@/generated/prisma/client"

type AuthUser = Omit<PrismaUser, "password">

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & Partial<AuthUser>
  }

  interface User extends Partial<AuthUser> {}
}

declare module "next-auth/jwt" {
  interface JWT {
    data?: AuthUser
  }
}