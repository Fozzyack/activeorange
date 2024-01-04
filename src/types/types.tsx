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

export type exercises = {
    name: string,
    id: number
}[]

export type exercises2 = {
    e_name: string,
    m_name: string[]
    id: number
}[]

export type exerciseData = {
        weight: string,
        sets: number,
        reps: number,
        rpe: number,
        log: string,
        date_recorded: string

}