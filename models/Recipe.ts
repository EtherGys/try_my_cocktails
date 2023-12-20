import { Schema, model, models } from "mongoose";


const RecipeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'    
    },
        recipe: {
            type: String, 
            required: [true, "La recette est obligatoire"],
            // match: []
            // 1:33:00
        },
        tag: {
            type: String,
            required: [true, "Le tag est obligatoire"],

            
        }
    })
    
    const Recipe = models.Recipe || model("Recipe", RecipeSchema);
    
    export default Recipe;
    