import { connectToDB, fileExists } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";
import User from "@models/User";



export async function POST(req: NextRequest, res: NextResponse) {
    
    const {userId, recipe, tag, title, ingredients, cover_image} = await req.json();
    
    const isFile = typeof cover_image == "object";
    try {
        if (isFile) {
            const blob = cover_image as Blob;
            const filename = blob.name;
            
            const existing = await fileExists(filename);
            if (existing) {
                // If file already exists, let's skip it.
                // If you want a different behavior such as override, modify this part.
                continue;
            }
            const buffer = Buffer.from(await blob.arrayBuffer());
            const stream = Readable.from(buffer);
            
            const uploadStream = bucket.openUploadStream(filename, {
                // make sure to add content type so that it will be easier to set later.
                contentType: blob.type,
                metadata: {}, //add your metadata here if any
            });
            await stream.pipe(uploadStream);
        }
        
        
        
        
        await connectToDB();
        const user = await User.findOne({id: userId})
        
        const newRecipe = new Recipe({
            creator: user._id.toString(),
            recipe,
            tag,
            title,
            creator_id: userId,
            ingredients,
            cover_image
        })
        
        await newRecipe.save();
        
        return new Response(JSON.stringify(newRecipe), {status: 201})
    } catch (error) {
        console.log(error);
        return new Response('Failed to create a new recipe', {status: 500})
        
    }
}