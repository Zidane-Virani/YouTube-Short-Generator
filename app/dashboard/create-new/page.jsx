'use client'
import React, { useState } from 'react'
import { Genre } from './_components/Genre'
import SelectStyle from './_components/SelectStyle'
import Length from './_components/Length'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Loader from './_components/Loader'

const Create = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [videoScript, setVideoScript] = useState([])
  const onHandleChange = (key,value) => {
    setFormData({...formData, [key]: value})
  }

  //Getting the Video Script
  const GetVideoScript = async () => {
    setLoading(true)
    const contents= `Write a script to generate ${formData.duration} seconds video on topic: ${formData.genre} along with AI image prompt in ${formData.style} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text`
    console.log(contents)
    const response = await axios.post ("/api/video-script", {
      contents: contents
    }).then((response) => {
      console.log(response.data)
      setVideoScript(response.data.response)
    }).catch((error) => {
      console.log(error)
    })
    setLoading(false)
  }


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
            </div>
        </div>
    </div>
  )
}

export default Create