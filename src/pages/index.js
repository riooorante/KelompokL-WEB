// pages/index.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import withAuth from "../components/withAuth";

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard'); 
  }, []);

  return null; 
}

export default withAuth(HomePage);
