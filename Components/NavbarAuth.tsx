

import { auth } from '@/auth'
import Navbar from './Navbar';

const NavbarAuth = async () => {
    const session = await auth();

    return (
        <Navbar session={session} />
    )
}

export default NavbarAuth
