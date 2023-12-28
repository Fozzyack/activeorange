import { Session, getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { pool } from "@/utils/db";
export const dynamic = "force-dynamic"
const MAX_FILE_SIZE_MB = 5;
interface ExtendedUserSession extends Session {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
    } | undefined
}






export async function POST(request: Request) {

    try {
        const session = await getServerSession(options) as ExtendedUserSession
        const data = await request.formData()
        const sql = `UPDATE users SET uploaded_image=$1, image_data=$2, image_type=$3 WHERE id=$4 RETURNING *`
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

        const wow = await pool.query(sql, [true, buffer, file.type, session.user?.id])
        console.log(wow.rows[0])
        return Response.json({ success: true })
    } catch (error: any) {
        Response.json({ success: false, error: error.message }, { status: 500 })

    }

}

export async function GET(request: Request) {
    
    try {
        const session = await getServerSession(options) as ExtendedUserSession
        const sql = `SELECT uploaded_image, image_data, image_type FROM users WHERE id=$1`
        const data = await pool.query(sql, [session.user?.id])
        return Response.json(data.rows[0])
    } catch (error: any) {
        console.log(error.message)
        Response.json({ error: error.message }, { status: 500 })
    }
}
