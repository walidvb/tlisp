import React from 'react'
import Embed from './Embed';

function IFrameAbsolute({}) {
  return (
      <div id="player-placeholder" style={{ position: 'fixed', zIndex: 3000 }}>
        <Embed />
    </div>
  )
}

export default IFrameAbsolute
