import { AbsoluteFill, Sequence, useVideoConfig } from "remotion"
import { Img } from "remotion"
import { useEffect } from "react"
import { Audio } from "remotion"
import { useCurrentFrame } from "remotion"

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
    const {fps} = useVideoConfig()
    const frame = useCurrentFrame()

    const getDurationFrame = () => {
        return captions?.[captions?.length - 1]?.end / 1000 * fps || 120
    }

    const getCurrentCaptions = () => {
        const currentTime = (frame / fps) * 1000; // Convert frame number to milliseconds
        const currentCaption = captions?.find((word) => currentTime >= word.start && currentTime <= word.end)
        return currentCaption ? currentCaption?.text : '';
      };

    useEffect(() => {
        if (setDurationInFrame && captions?.length > 0) {
            const duration = captions[captions.length - 1]?.end / 1000 * fps
            setDurationInFrame(duration)
        }
    }, [captions, fps, setDurationInFrame])

    return (
        <AbsoluteFill className='bg-black'>
          {imageList?.map((item, index) => (
              <Sequence key={index} from={(index * getDurationFrame()/imageList?.length)} durationInFrames={getDurationFrame()}>
                <Img src={item} style={{width: '100%', height: '100%', objectFit: 'cover'} } />
                <AbsoluteFill style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: '40px'
                }}>
                    <h2 style={{
                        color: 'white',
                        fontSize: '24px',
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '10px 20px',
                        borderRadius: '8px'
                    }}>
                        {getCurrentCaptions()}
                    </h2>
                </AbsoluteFill>
              </Sequence>
          ))}
          {audioFileUrl && <Audio src={audioFileUrl} />}
        </AbsoluteFill>
      );
      
  }

export default RemotionVideo