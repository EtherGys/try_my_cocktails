import { connectToDB } from "@/utils/database";
import  {NextRequest} from "next/server"
import Recipe from "@models/Recipe";

export async function GET(req: NextRequest, {params}: DBProps) {
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