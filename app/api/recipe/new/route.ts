import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";
import User from "@models/User";

export async function POST(req: NextRequest, res: NextResponse) {
    const {userId, recipe, tag, title, ingredients, file_url, file_public_id} = await req.json();
   
    try {
        await connectToDB();
        const user = await User.findOne({id: userId})
        const currentDate = new Date();
        
        const newRecipe = new Recipe({
            creator: user._id.toString(),
            recipe,
            tag,
            title,
            creator_id: userId,
            ingredients,
            added_date: currentDate,
            file_url,
            file_public_id
        })
        
        await newRecipe.save();
        
        return new Response(JSON.stringify(newRecipe), {status: 201})
    } catch (error) {
        console.log(error);
        return new Response('Failed to create a new recipe', {status: 500})
        
    }
}