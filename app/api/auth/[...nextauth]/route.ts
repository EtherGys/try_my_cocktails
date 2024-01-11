import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@models/User";





const handler =  NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID :'',
            clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : ''
        })
    ],
    callbacks: {
        async signIn({profile}) {
            try {
                await connectToDB();
                
                const userExists = await User.findOne({email: profile?.email});
                
                if (!userExists) {
                    
                    await User.create({
                        email: profile?.email,
                        username: profile?.name,
                        image: profile?.image,
                        id: profile?.sub
                    })
                }
                
                return true;
            } catch (error) {
                console.log(error);
                return false;
                
            }
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST }