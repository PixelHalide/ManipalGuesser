'use client'

import { useSession } from "next-auth/react";
import Link from 'next/link'

const UserIcon = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    return null;
  }
  return (
         <Link href={"/userpage"} className="">
            <img
            src={session.user.image ?? "/default-user-icon.png"}
            alt="User Icon"
            className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-all duration-200"
            >
            </img>
        </Link>
  )
}

export default UserIcon
