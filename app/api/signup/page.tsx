import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    if (session && session.user) {
        const user = session.user;
        try {
            const baseUrl = 'http://https://538f-13-233-131-89.ngrok-free.app';
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
