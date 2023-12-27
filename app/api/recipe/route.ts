import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";


export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const recipes = await Recipe.find({}).populate('creator').sort({added_date: -1});

        return new Response(JSON.stringify(recipes), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all recipes', {status: 500})
        
    }
}