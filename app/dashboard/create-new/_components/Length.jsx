'use client'
import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const Length = ({ onUserSelect }) => {
    const options=['30 Seconds','60 Seconds']
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-xl text-primary'>Duration</h2>
        <p className='text-gray-500'>Select the duration of your video</p>
        <Select onValueChange={(value)=>{
            onUserSelect('duration', value)
        }}>
            <SelectTrigger>
                <SelectValue placeholder='Select Duration' />
            </SelectTrigger>
            <SelectContent>
                {options.map((item,index)=>(
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default Length