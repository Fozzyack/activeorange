import { getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/options"

export async function POST(request: Request) {
    const session = await getServerSession(options)
    console.log(session?.user)
    console.log('test')
    const data = await request.json()
    const name = data.name
    return Response.json(data)
}