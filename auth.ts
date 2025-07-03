import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Discord({
        clientId: process.env.AUTH_DISCORD_ID!,
        clientSecret: process.env.AUTH_DISCORD_SECRET!,
    })],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken as string
            session.user.id = token.id as string
            return session
        },
    },
});