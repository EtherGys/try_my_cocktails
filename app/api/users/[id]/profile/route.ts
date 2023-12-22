import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";

interface UserProps {
params: any
}

export async function GET(req: NextRequest, {params}: UserProps) {
    try {
        await connectToDB();
        const recipes = await Recipe.find({
            creator_id: params.id
        }).populate('creator');
        
        return new Response(JSON.stringify(recipes), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all recipes', {status: 500})
        
    }
}