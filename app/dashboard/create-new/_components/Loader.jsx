import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from 'lucide-react'

const Loader = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white flex flex-col items-center justify-center p-8 gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className='w-12 h-12 animate-spin text-purple-600' />
            <AlertDialogTitle className="text-center font-bold text-2xl text-gray-800">Generating your video...</AlertDialogTitle>
        </div>
        <AlertDialogDescription className="text-center text-gray-500 text-base">
          Please wait while we craft your story, scenes, and visuals. <br/> This might take a few moments. Do not refresh the page.
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Loader