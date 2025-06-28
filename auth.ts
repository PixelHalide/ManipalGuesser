import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord'

const discordProvider = Discord({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
}) as any;

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [discordProvider],
});