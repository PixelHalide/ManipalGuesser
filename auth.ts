import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Discord],
});