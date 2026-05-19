import React from 'react'

function Primarybtn({ children, onClick }) {
  return (
    <button className="primary-btn" onClick={onClick}>
      {children}
    </button>
  )
}

export default Primarybtn