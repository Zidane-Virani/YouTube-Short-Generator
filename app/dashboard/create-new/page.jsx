'use client'
import React, { useState, useContext, useEffect } from 'react'
import { Genre } from './_components/Genre'
import SelectStyle from './_components/SelectStyle'
import Length from './_components/Length'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Loader from './_components/Loader'
import { VideoDataContext } from '@/app/_context/VideoDataContext'
import Dialoge from '@/app/dashboard/_components/Dialoge'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'

const Create = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [videoScript, setVideoScript] = useState([])
  const [audioUrl, setAudioUrl] = useState(null)
  const [captions, setCaptions] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [playVideo, setPlayVideo] = useState(true)
  const [videoId, setVideoId] = useState(3)
  const [images, setImages] = useState([])
  const {videoData, setVideoData} = useContext(VideoDataContext)
  const { user } = useUser()
  const onHandleChange = (key,value) => {
    setFormData({...formData, [key]: value})
  }

  //Getting the Video Script
  const GetVideoScript = async () => {
    setLoading(true)
    const contents= `Write a script to generate ${formData.duration} seconds video on topic: ${formData.genre} along with AI image prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text`
    const response = await axios.post ("/api/video-script", {
      contents: contents
    }).then((response) => {
      setVideoData({...videoData, videoScript: response.data.response})
      setVideoScript(response.data.response)
      GenerateAudio(response.data.response)
    }).catch((error) => {
      console.log(error)
    }) 
    setLoading(false)
  }
  const GenerateAudio = async (videoScript) => {
    let scriptText = ""
    const id = uuidv4()
    videoScript.forEach((item) => {
      scriptText += (item.contentText || item.ContentText) + " "
    })
    console.log("Audio script text:", scriptText)
    await axios.post ("/api/audio", {
      text: scriptText,
      id: id
    }).then(async (response) => {
      const audioFileUrl = response.data.result;
      setAudioUrl(audioFileUrl)
      
      // Get captions from the audio
      await GetCaptions(audioFileUrl, videoScript);
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }
  
  const GetCaptions = async (audioFileUrl, videoScript) => {
    await axios.post ("/api/captions", {
      audioUrl: audioFileUrl
    }).then((response) => {
      console.log("Captions:", response.data)
      setCaptions(response.data.result)
      
      // Now generate images
      GenerateImage(videoScript, audioFileUrl, response.data.result)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }

  const GenerateImage = async (videoScript, audioFileUrl, captionsData) => {
    let images = []
    
    // Process all image generation requests
    for (const item of videoScript) {
      try {
        const response = await axios.post("/api/image", {
          prompt: item.imagePrompt
        });
        console.log("Generated image URL:", response.data.result)
        images.push(response.data.result)
        
        // Add a small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log("Error generating image:", error)
      }
    }
    
    console.log("All generated images:", images)
    setImages(images)
    
    // Save all data to database
    await SaveVideoData(videoScript, audioFileUrl, captionsData, images);
  }

  const SaveVideoData = async (script, audioFileUrl, captions, imageList) => {
    try {
      console.log("Saving video data to database...");
      
      const result = await db.insert(VideoData).values({
        script: script,
        audioFileUrl: audioFileUrl,
        captions: captions,
        imageList: imageList, // store as array (schema expects varchar array)
        createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
      }).returning({ id: VideoData?.id });
      
      console.log("Video data saved with ID:", result[0].id);
      setVideoId(result[0].id)
      setPlayVideo(true)
      setLoading(false)
    } catch (error) {
      console.error("Error saving video data:", error);
      setLoading(false)
    }
  };

  const handleSubmit = async () => {
    await GetVideoScript()
  }


  return (
    <div className="md:px-30">
        <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
        <div className="mt-10 border-2 border-gray-300 rounded-lg p-10 shadow-md">
            <Genre onUserSelect={onHandleChange} />
            <SelectStyle onUserSelect={onHandleChange} />
            <Length onUserSelect={onHandleChange} />
            <div className="flex justify-center mt-8">
              <Button className="px-6 py-2 text-lg" onClick={handleSubmit}>Create</Button>
              <Loader loading={loading} />
              <Dialoge playVideo={playVideo} videoId={videoId} />
            </div>
        </div>
    </div>
  )
}

export default Create