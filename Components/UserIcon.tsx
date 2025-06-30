'use client'

interface User {
  name: string;
  email: string;
  image: string;
}

interface Session {
  user: User;
  expires: string;
}

interface SessionProp {
  session: Session;
}

const UserIcon = ({ session }: SessionProp ) => {

  return (
    <div>
        <div className="p-2">
            <img
            src={session.user.image}
            alt="User Icon"
            className="w-10 h-10 rounded-full object-cover"
            >
            </img>
        </div>
    </div>
  )
}

export default UserIcon
