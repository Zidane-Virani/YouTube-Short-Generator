import React, { useState } from 'react'
import Image from 'next/image'

const SelectStyle = ({ onUserSelect }) => {
    const styleOptions = [
        {
          name: 'Realistic',
          image: '/real.png',
        },
        {
          name: 'Cartoon',
          image: '/cartoon.png',
        },
        {
          name: 'Comic',
          image: '/comic.png',
        },
        {
          name: 'GTA 5',
          image: '/gta.png',
        },
      ];
      const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-xl text-primary'>Style</h2>
        <p className='text-gray-500'>What is the Style of your video?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
          {styleOptions.map((style) => {
            const isSelected = selectedOption === style.name;
            return (
              <div
                key={style.name}
                onClick={() => {
                  setSelectedOption(style.name)
                  onUserSelect('style', style.name)
                }}
                className={`relative overflow-hidden transition-all cursor-pointer rounded-xl ${
                  isSelected
                    ? 'border-4 border-primary ring-2 ring-primary/30 bg-primary/10 scale-[1.02]'
                    : 'border border-gray-200 hover:border-primary/70 hover:scale-105'
                }`}
              >
                <Image 
                  src={style.image} 
                  width={100} 
                  height={100} 
                  alt={`${style.name} preview`}
                  className='h-48 object-cover w-full'
                />
                <h2
                  className={`absolute bottom-0 p-2 w-full text-center text-[12px] ${
                    isSelected ? 'bg-primary text-white' : 'bg-black/70 text-white'
                  }`}
                >
                  {style.name}
                </h2>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default SelectStyle
