'use client'
import React, { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export const Genre = ({ onUserSelect } ) => {
  const options = [
    'Comedy',
    'Drama',
    'Action',
    'Horror',
    'Sci-Fi',
    'Documentary',
    'Education',
    'Music',
    'Gaming',
    'Sports',
    'News',
    'Lifestyle',
    'Travel',
    'Food',
    'Custom',
  ];
  const [selectedGenre, setSelectedGenre] = useState('');
  const [customGenre, setCustomGenre] = useState('');

  return (
    <div>
        <h2 className='font-bold text-xl text-primary'>Content</h2>
        <p className='text-gray-500'>What is the Genre of your video?</p>
        <Select
          onValueChange={(value) => {
            setSelectedGenre(value);
            value !== 'custom'&&onUserSelect("genre",value)
          }}
        >
            <SelectTrigger>
                <SelectValue placeholder='Genre' />
            </SelectTrigger>
            <SelectContent>
              {options.map((genre) => {
                const value = genre === 'Custom' ? 'custom' : genre.toLowerCase();
                return (
                  <SelectItem key={genre} value={value}>
                    {genre}
                  </SelectItem>
                );
              })}
            </SelectContent>
        </Select>

        {selectedGenre === 'custom' && (
          <Textarea
            placeholder='Customize Your Prompt'
            value={customGenre}
            onChange={(e) => onUserSelect("custom",e.target.value)}
            className='mt-4'
          />
        )}
    </div>
  )
}

export default Genre