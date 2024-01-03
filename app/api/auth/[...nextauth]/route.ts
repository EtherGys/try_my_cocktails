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
        jwt({ token, account, user }) {
            if (account) {
              token.accessToken = account.access_token
              token.id = user?.id
            }
            return token
          },
        // async session({session, token}) {
        //     const sessionUser = await User.findOne({email: session.user?.email});
        //     session.user?.id = token.id;
            
        //     return session;
        // },
        session: ({ session, token }) => ({
            ...session,
            user: {
              ...session.user,
              id: token.sub,
            },
          }),
        async signIn({profile}) {
            try {
                await connectToDB();
                
                const userExists = await User.findOne({email: profile?.email});
                
                if (!userExists) {

                    await User.create({
                        email: profile?.email,
                        username: profile?.name,
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