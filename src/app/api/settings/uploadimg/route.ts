import { Session, getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid'
import { writeFile } from "fs/promises";
import { pool } from "@/utils/db";
import fs from 'fs'
export const dynamic = "force-dynamic"
interface ExtendedUserSession extends Session {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
    } | undefined
}

const MAX_FILE_SIZE_MB = 5;

export async function POST(request: Request) {

    try {
        const session = await getServerSession(options) as ExtendedUserSession
        const data = await request.formData()
        const sql = `UPDATE users SET image=$1 WHERE id=$2`
        const file: File | null = data.get('file') as unknown as File
        if (!file) {
            return Response.json({ success: false }, { status: 500 })
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024); // Convert to megabytes
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            return Response.json({ success: false, error: `File to Large Max File Size ${MAX_FILE_SIZE_MB}Mb` }, { status: 500 });
        }

        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Add more types if needed
        if (!allowedImageTypes.includes(file.type)) {
            return Response.json({ success: false, error: 'Only JPEG and PNG Images Allowed' }, { status: 500 });
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const file_type = file.type.split('/')
        const name = uuidv4().concat('.', file_type[1])
        const path = join('public/uploads/', name)
        await pool.query(sql, [''.concat('/uploads/', name), session.user?.id])
        const existingImagePath = join('public', session.user?.image || '');
        if (fs.existsSync(existingImagePath)) {
            try {
                fs.unlinkSync(existingImagePath);
            } catch (error) {
                console.error('Error deleting existing file:', error);
                return Response.json({ success: false }, { status: 500 });
            }
        }

        await writeFile(path, buffer)
        return Response.json({ success: true })
    } catch (error: any) {
        Response.json({ success: false, error: error.message }, { status: 500 })

    }

}