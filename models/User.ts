import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
email: {
    type: String, 
    unique: [true, 'Cet email est déjà renseigné'],
    required: [true, "L'email est obligatoire"]
},
username: {
    type: String, 
    required: [true, "Le nom d'utilisateur est obligatoire"],
    // match: []
    // 1:33:00
},
image: {
    type: String,
    required: [true, "L'image' est obligatoire"],
},
id: {
    type: String,
    required: [true, "L'id Google est obligatoire"],
}
})

const User = models.User || model("User", UserSchema);

export default User;