import NextAuth  from 'next-auth';

import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async session({ session, token }) {
            if (!session.user || !token.sub) {
                throw new Error('session or token undefined')
                
            }
            else {
                session.user.username = session.user.name?.split(' ').join('').toLocaleLowerCase();
                session.user.uid = token.sub;
            }
            
            return session;
        }
    }
})

export { handler as GET, handler as POST };