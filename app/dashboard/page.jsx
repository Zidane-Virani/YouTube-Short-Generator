'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import EmptyState from './_components/EmptyState'
import Link from 'next/link'

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href="/dashboard/create-new"><Button>+ Create New</Button></Link>
        
      </div>

      {videos.length == 0 && 
      <div>
        <EmptyState />
      </div>}
    </div>
  )
}

export default Dashboard