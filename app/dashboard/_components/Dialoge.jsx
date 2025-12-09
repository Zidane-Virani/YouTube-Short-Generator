"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player"
import RemotionVideo from "./RemotionVideo"
import { useState, useEffect } from "react"
import { db } from "@/configs/db"
import { VideoData } from "@/configs/schema"
import { eq } from "drizzle-orm"

function Dialoge({playVideo, videoId}) {
    const [openDialog, setOpenDialog] = useState(false)
    const [videoData, setVideoData] = useState()
    const [durationFrame, setDurationFrame] = useState(100)
    
    useEffect(() => {
        const GetVideoData = async () => {
            const result = await db.select().from(VideoData)
              .where(eq(VideoData.id, videoId));
            console.log("Video Data",result);
            setVideoData(result[0])
        };
        
        if (playVideo) {
            setOpenDialog(playVideo)
            videoId&&GetVideoData()
        }
    }, [playVideo, videoId])

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white flex flex-col items-center justify-center">
            <DialogTitle className="text-3xl font-bold my-5">Video is ready</DialogTitle>
            <div className="flex flex-col items-center w-full">
                <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    controls={true}
                    fps={30}
                    inputProps={{
                        ...(videoData || {}),
                        setDurationInFrame: (frameValue) => setDurationFrame(frameValue)
                    }}
                />
            </div>
            <DialogFooter className="flex gap-3 mt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="button">Export</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default Dialoge
