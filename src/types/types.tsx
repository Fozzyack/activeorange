import { Session } from "next-auth";

export interface ExtendedServerSession extends Session {
    user?: {
        id?: string | null | undefined,
        email?: string | null | undefined,
        name?: string | null | undefined,
        image?: string | null | undefined,
    } | undefined
}

export type records = {
    name: string;
    exerciseId: number;
}[]