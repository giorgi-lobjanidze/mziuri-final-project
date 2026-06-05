import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function Wishlist() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>Wishlist</div>;
}

export default Wishlist;
