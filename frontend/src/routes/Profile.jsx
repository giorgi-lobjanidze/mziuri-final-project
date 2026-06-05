import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';

function Profile() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, [useFakeLoader]);

  return <div>Profile</div>;
}

export default Profile;
