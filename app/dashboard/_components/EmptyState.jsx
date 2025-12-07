import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EmptyState = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-3xl min-h-[24rem] border-2 border-dashed border-gray-300 rounded-lg px-14 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">No Shorts Have Been Created Yet</h2>
        <Button asChild>
          <Link href="/dashboard/create-new">+ Create New</Link>
        </Button>
      </div>
    </div>
  )
}

export default EmptyState