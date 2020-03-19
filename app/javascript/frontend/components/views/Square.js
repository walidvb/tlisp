import React from 'react'

function Square({ children, className }) {
  return (
    <div className={className} style={{
      paddingBottom: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
      }}>
        {children}
      </div>
    </div>
  )
}

export default Square
