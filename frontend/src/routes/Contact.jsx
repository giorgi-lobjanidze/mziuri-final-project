import React, { useEffect } from 'react'
import { useLoader } from '../context/LoaderContext';

function Contact() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <div>Contact</div>
  )
}

export default Contact