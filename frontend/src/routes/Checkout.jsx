import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function Checkout() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>Checkout</div>;
}

export default Checkout;
