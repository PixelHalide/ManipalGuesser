'use client'

import { useSession } from "next-auth/react";
import Image  from "next/image";
import Link from 'next/link'

const UserIcon = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    return null;
  }
  return (
         <Link href={"/userpage"} className="">
            <Image
            width={40}
            height={40}
            src={session.user.image ?? "/default-user-icon.png"}
            alt="User Icon"
            className=" rounded-full object-cover hover:scale-110 transition-all duration-200"
            />
        </Link>
  )
}

export default UserIcon
