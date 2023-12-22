import mongoose from 'mongoose';
import { MongoClient, GridFSBucket } from "mongodb";
declare global {
  var client: MongoClient | null;
  var bucket: GridFSBucket | null;
}

let isConnected = false;

export const connectToDB = async () => {
    const bucket = (global.bucket = new GridFSBucket(client.db(), {
        bucketName: "images",
      }));

    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("mongodb is already connected");
        return
        
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: "try_my_cocktails",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        isConnected = true;
    } catch (error) {
        console.log(error);
        
    }
}

export async function fileExists(filename: string): Promise<boolean> {
    const { client } = await connectToDB();
    const count = await client
      .db()
      .collection("images.files")
      .countDocuments({ filename });
  
    return !!count;
  }