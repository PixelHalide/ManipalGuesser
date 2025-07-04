import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if (session && session.user) {
        const user = session.user;
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${baseUrl}/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: user.name,
                    userEmail: user.email,
                    userImage: user.image,
                    userID: user.id,
                    globalName: user.global_name,
                    discordUser: user.username
                }),
            });

            if (!response.ok) {
                console.error('Failed to call signUp endpoint:', response.statusText);
            } else {
                console.log('User signed up successfully');
            }
        } catch (error) {
            console.error('Error calling signUp endpoint:', error);
        }
    }
    redirect('/');
}

export default page
