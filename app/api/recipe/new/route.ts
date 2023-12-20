import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";
import User from "@models/User";



export async function POST(req: NextRequest, res: NextResponse) {
    
    const {userEmail, recipe, tag} = await req.json();
    
    try {
        await connectToDB();
        const user = await User.findOne({email: userEmail})
        
        const newRecipe = new Recipe({
            creator: user._id.toString(),
            recipe,
            tag
        })
        
        await newRecipe.save();
        
        return new Response(JSON.stringify(newRecipe), {status: 201})
    } catch (error) {
        console.log(error);
        return new Response('Failed to create a new recipe', {status: 500})
        
    }
}