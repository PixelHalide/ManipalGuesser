import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Discord({
        clientId: process.env.AUTH_DISCORD_ID!,
        clientSecret: process.env.AUTH_DISCORD_SECRET!,
    })],
    secret: process.env.AUTH_SECRET,
});