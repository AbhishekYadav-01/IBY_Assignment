import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null;
};

export default IndexPage;
