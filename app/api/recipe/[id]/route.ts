import { connectToDB } from "@/utils/database";
import  {NextResponse, NextRequest} from "next/server"
import Recipe from "@models/Recipe";
import { request } from "http";

interface RecipeProps {
    params: any
}

export async function GET(req: NextRequest, {params}: RecipeProps) {
    try {
        await connectToDB();
        const recipe = await Recipe.findById(params.id);
        if (!recipe) {
            return new Response('Recipe not found', {status: 404})
            
        }
        
        return new Response(JSON.stringify(recipe), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all recipes', {status: 500})
        
    }
}
export async function PATCH(req: NextRequest, {params}: RecipeProps) {
    const { tag, recipe } = await req.json();

    try {
        await connectToDB();
        const existingRecipe = await Recipe.findById(params.id);
        if (!existingRecipe) return new Response('Recipe not found', {status: 404})
          
        existingRecipe.recipe = recipe;
        existingRecipe.tag = tag;

        await existingRecipe.save();

        return new Response(JSON.stringify(existingRecipe), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to update the recipe', {status: 500})
        
    }
}
export async function DELETE(req: NextRequest, {params}: RecipeProps) {

    try {
        await connectToDB();
        await Recipe.findByIdAndDelete(params.id);

        return new Response("Recipe deleted successfully", {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to delete the recipe', {status: 500})
        
    }
}