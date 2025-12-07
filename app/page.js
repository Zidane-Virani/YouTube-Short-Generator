import React from 'react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <h1>page</h1>
      
    <Button>Click me</Button>
    <UserButton>
    </UserButton>
    </div>
  )
}

export default Home