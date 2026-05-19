import React, { useEffect } from 'react'
import { useLoader } from '../context/LoaderContext';

function Shop() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <div>Shop</div>
  )
}

export default Shop