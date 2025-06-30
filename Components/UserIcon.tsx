'use client'

import { Session } from "next-auth"

interface SessionProp {
  session: Session;
}

const UserIcon = ({ session }: SessionProp ) => {
  if (!session?.user) {
    return null;
  }

  return (
    <div>
        <div className="p-2">
            <img
            src={session.user.image ?? "/default-user-icon.png"}
            alt="User Icon"
            className="w-10 h-10 rounded-full object-cover"
            >
            </img>
        </div>
    </div>
  )
}

export default UserIcon
