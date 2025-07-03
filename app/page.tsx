import { SessionProvider } from 'next-auth/react';
import Home from './home';

const page = () => {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  )
}

export default page
