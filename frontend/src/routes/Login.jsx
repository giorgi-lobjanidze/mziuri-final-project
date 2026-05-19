import React, { useEffect } from 'react'
import { useLoader } from '../context/LoaderContext';


function Login() {

  const { useFakeLoader } = useLoader();
  useEffect(() => { useFakeLoader(); }, [useFakeLoader]);

  return (
    <div>Login</div>
  )
}

export default Login