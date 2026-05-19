import React, { useEffect } from 'react'
import { useLoader } from '../context/LoaderContext';

function Register() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <div>Register</div>
  )
}

export default Register