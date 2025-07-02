import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Discord({
        clientId: process.env.AUTH_DISCORD_ID!,
        clientSecret: process.env.AUTH_DISCORD_SECRET!,
    })],
    secret: process.env.AUTH_SECRET,
    events: {
        async signIn({ user, isNewUser }) {
            if (user.email && user.name && user.image) {
                try {
                    const response = await fetch(`https://538f-13-233-131-89.ngrok-free.app/signUp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userName: user.name,
                            userEmail: user.email,
                            userImage: user.image,
                            isNewUser: isNewUser,
                        }),
                    });

                    if (!response.ok) {
                        console.error('Failed to call signUp endpoint:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error calling signUp endpoint:', error);
                }
            }
        },
    },
});