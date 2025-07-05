import { SessionProvider } from 'next-auth/react';
import Home from './home';
import { auth } from '@/auth';

const page = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Home />
    </SessionProvider>
  )
}

export default page
