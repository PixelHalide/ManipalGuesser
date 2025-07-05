

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';

const NavbarAuth = async () => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <Navbar />
        </SessionProvider>
    )
}

export default NavbarAuth
