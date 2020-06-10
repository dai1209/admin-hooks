import React, { useState, useEffect } from 'react';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';

const FullScreen = () => {
  const isFullscreen = !!(
    document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.fullScreen
    || document.mozFullScreen
    || document.webkitIsFullScreen 
  ) 
  const [fullScreen, setFullScreen ] = useState(isFullscreen)
  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      setFullScreen(c => !c)
    })
    document.addEventListener('mozfullscreenchange', () => {
      setFullScreen(c => !c)
    });
    document.addEventListener('webkitfullscreenchange', () => {
      setFullScreen(c => !c)
    });
    document.addEventListener('msfullscreenchange', () => {
      setFullScreen(c => !c)
    });
  },[])
  const handleFullscreen = () => {
    if (fullScreen) {
      document.exitFullscreen && document.exitFullscreen()
      document.mozCancelFullScreen && document.mozCancelFullScreen()
      document.webkitCancelFullScreen && document.webkitCancelFullScreen()
      document.msExitFullscreen && document.msExitFullscreen()
    }else {
      document.body.requestFullscreen && document.body.requestFullscreen()
      document.body.mozRequestFullScreen && document.body.mozRequestFullScreen()
      document.body.webkitRequestFullScreen && document.body.webkitRequestFullScreen()
      document.body.msRequestFullscreen && document.body.msRequestFullscreen()
    }
  }
  return (
    <div onClick={handleFullscreen} >
      {fullScreen ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
    </div>
  )
}
export default FullScreen;