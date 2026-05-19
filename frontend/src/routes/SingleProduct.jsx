import React, { useEffect } from 'react'
import { useLoader } from '../context/LoaderContext';

function SingleProduct() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct