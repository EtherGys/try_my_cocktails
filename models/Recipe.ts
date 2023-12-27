import { Schema, model, models } from "mongoose";


const RecipeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'    
    },
    creator_id: {
        type: String, 
        required: [true, "L'id Google' est obligatoire"],
    },
    title: {
        type: String, 
        required: [true, "Le titre est obligatoire"],
        // match: []
        // 1:33:00
    },
    recipe: {
        type: String, 
        required: [true, "La recette est obligatoire"],
        // match: []
        // 1:33:00
    },
    ingredients: {
        type: Array, 
        required: [true, "Les ingrédients sont obligatoires"],
        // match: []
        // 1:33:00
    },
    tag: {
        type: [],
        required: [true, "Le tag est obligatoire"],
    },
    added_date: {
        type: Date,
    }
})

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;
