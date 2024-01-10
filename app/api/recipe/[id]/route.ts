import { connectToDB } from "@/utils/database";
import  { NextRequest } from "next/server"
import Recipe from "@models/Recipe";

export async function GET(req: NextRequest, {params}: DBProps) {
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

export async function PATCH(req: NextRequest, {params}: DBProps) {
    const { tag, recipe, title, ingredients, file_url, file_public_id } = await req.json();

    try {
        await connectToDB();
        const existingRecipe = await Recipe.findById(params.id);
        if (!existingRecipe) return new Response('Recipe not found', {status: 404})
          
        existingRecipe.recipe = recipe;
        existingRecipe.tag = tag;
        existingRecipe.title = title;
        existingRecipe.ingredients = ingredients;
        existingRecipe.file_url = file_url;
        existingRecipe.file_public_id = file_public_id;

        await existingRecipe.save();

        return new Response(JSON.stringify(existingRecipe), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to update the recipe', {status: 500})
        
    }
}
export async function DELETE(req: NextRequest, {params}: DBProps) {

    try {
        await connectToDB();
        await Recipe.findByIdAndDelete(params.id);

        return new Response("Recipe deleted successfully", {status: 200})
    } catch (error) {
        console.log(error);
        return new Response('Failed to delete the recipe', {status: 500})
        
    }
}