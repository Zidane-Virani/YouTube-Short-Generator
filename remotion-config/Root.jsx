import React from 'react'
import { Composition } from 'remotion'
import RemotionVideo from '../app/dashboard/_components/RemotionVideo'

const RemotionRoot = () => {
  return (
   <>
   <Composition
      id="RemotionVideo"
      component={RemotionVideo}
      durationInFrames={120}
      fps={30}
      width={300}
      height={450}
      defaultProps={{
        script: [],
        imageList: [],
        audioFileUrl: '',
        captions: [],
        setDurationInFrame: () => {}
      }}
    />
   </>
  )
}

export default RemotionRoot