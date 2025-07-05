import { auth } from '@/auth'
import Image from 'next/image';
import { logout } from '@/lib/actions/auth';

const UserPage = async () => {
    const session = await auth();

    if (!session?.user) {
        return (
        <div>
            <h1 className="text-black dark:text-neutral-200">Please log in to view your profile</h1>
        </div>
        );
    }
  return (
    <div className='flex flex-col items-center'>
        <h1 className="text-black dark:text-neutral-200 text-6xl text-center mt-14">Welcome, {session.user?.name}</h1>
        <div className="p-6">
            <Image
            src={session.user.image ?? "/default-user-icon.png"}
            alt="User Icon"
            width={120}
            height={120}
            className="rounded-full object-cover"
            >
            </Image>
        </div>
        <button onClick={logout} className="inline-flex h-12 items-center justify-center rounded-md bg-red-500 px-6 font-medium text-neutral-50 transition active:scale-110 cursor-pointer">Sign Out</button>
    </div>
  )
}

export default UserPage
