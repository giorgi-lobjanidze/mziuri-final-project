import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function Blog() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>Blog</div>;
}

export default Blog;
