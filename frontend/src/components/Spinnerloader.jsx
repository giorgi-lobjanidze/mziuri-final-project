import React from 'react';

function Spinnerloader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <span className="loader"></span>
    </div>
  );
}

export default Spinnerloader;
