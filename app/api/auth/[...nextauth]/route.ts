import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters"
import Providers from "next-auth/providers/credentials"
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/User";





const handler =  NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID :'',
            clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : ''
        })
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({email: session.user?.email});
            // let sessionId = sessionUser._id.toString()
            // sessionId = session.user?.id;
            // session.user?.id = sessionUser._id.toString();
     
            
            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDB();
                
                const userExists = await User.findOne({email: profile?.email});
                
                console.log(profile);
                if (!userExists) {

                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile?.picture,
                        id: profile?.sub
                    })
                }
                
                return true;
            } catch (error) {
                console.log(error);
                return false;
                
            }
        },
    }
})

export { handler as GET, handler as POST }