import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import User from "@models/User";



export async function GET(req: NextRequest, {params}: DBProps) {
    try {
        await connectToDB();
        const user = await User.findOne({
            id: params.id
        }).populate('id');

        if (!user) {
            return new Response('User not found', {status: 404})
        }
        
        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch the user', {status: 500})
        
    }
}