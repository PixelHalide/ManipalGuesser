'use client'

import { Session } from "next-auth"

import Link from 'next/link'
interface SessionProp {
  session: Session;
}

const UserIcon = ({ session }: SessionProp ) => {
  if (!session?.user) {
    return null;
  }

  return (
         <Link href={"/userpage"} className="">
            <img
            src={session.user.image ?? "/default-user-icon.png"}
            alt="User Icon"
            className="w-10 h-10 rounded-full object-cover"
            >
            </img>
        </Link>
  )
}

export default UserIcon
