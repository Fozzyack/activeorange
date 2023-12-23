import PostgresAdapter from "@auth/pg-adapter"
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { pool } from "@/utils/db";
import { Adapter } from "next-auth/adapters";

export const options : NextAuthOptions = {
    adapter: PostgresAdapter(pool) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 40000
            }
        }),
    ]
}