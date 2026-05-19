import React from 'react'

function Secondarybtn({ children, onClick }) {
  return (
    <button className="secondary-btn" onClick={onClick}>
      {children}
    </button>
  )
}

export default Secondarybtn