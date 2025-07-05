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
                token.username = profile.username
                token.global_name = (profile as any).global_name
            }
            return token
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken as string
            session.user.id = token.id as string
            ;(session.user as any).username = token.username as string
            ;(session.user as any).global_name = token.global_name as string
            return session
        },
    },
});