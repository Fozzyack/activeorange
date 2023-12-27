import { Session, getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid'
import { writeFile } from "fs/promises";
interface ExtendedUserSession extends Session {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
    } | undefined
}


export async function POST(request: Request) {
    const session = await getServerSession(options) as ExtendedUserSession
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        return Response.json(JSON.stringify({ success: false }), { status: 500 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const file_type = file.type.split('/')
    const name = uuidv4().concat('.', file_type[1])
    const path = join('public/uploads/', name)
    await writeFile(path, buffer)
    return Response.json({success: true})
}