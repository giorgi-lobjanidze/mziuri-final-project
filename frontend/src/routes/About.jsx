import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function About() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>About</div>;
}

export default About;
