import PostgresAdapter from "@auth/pg-adapter"
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { pool } from "@/utils/db";
import { Adapter } from "next-auth/adapters";

interface ExtendedUserSession {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined;
}
export const options: NextAuthOptions = {
    adapter: PostgresAdapter(pool) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            (session.user as ExtendedUserSession).id = user.id
            return session
        }
    }
}