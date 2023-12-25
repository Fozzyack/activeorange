import PostgresAdapter from "@auth/pg-adapter"
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { pool } from "@/utils/db";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";

interface ExtendedUserSession {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id?: string | null | undefined;
}
export const options: NextAuthOptions = {
    adapter: PostgresAdapter(pool) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
        Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: 'no-reply@example.com'
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            (session.user as ExtendedUserSession).id = user.id
            return session
        }
    },
    pages:{
        signOut: '/auth/signout',
        signIn: '/auth/signin'
    }
}