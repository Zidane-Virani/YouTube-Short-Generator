'use client'
import React, { useState } from 'react'
import { Genre } from './_components/Genre'
import SelectStyle from './_components/SelectStyle'
import Length from './_components/Length'
import { Button } from '@/components/ui/button'

const Create = () => {
  const [formData, setFormData] = useState([]);
  const onHandleChange = (key,value) => {
    setFormData({...formData, [key]: value})
  }


  return (
    <div className="md:px-30">
        <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>
        <div className="mt-10 border-2 border-gray-300 rounded-lg p-10 shadow-md">
            <Genre onUserSelect={onHandleChange} />
            <SelectStyle onUserSelect={onHandleChange} />
            <Length onUserSelect={onHandleChange} />
            <div className="flex justify-center mt-8">
              <Button className="px-6 py-2 text-lg">Create</Button>
            </div>
        </div>
    </div>
  )
}

export default Create