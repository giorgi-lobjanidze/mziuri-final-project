import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function Cart() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>Cart</div>;
}

export default Cart;
