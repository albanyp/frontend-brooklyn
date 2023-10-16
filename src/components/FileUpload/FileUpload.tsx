import React, { useEffect, useState } from 'react'
import { InputProps } from 'components/Input/Input'
import clsx from 'clsx'

interface FileUploadProps extends InputProps {
  name: string
  label: string
  accept: string
  register: any
  secondaryLabel?: string
  optional?: boolean
}

export const FileUpload = ({ accept, label, name, optional = true, register, secondaryLabel }: FileUploadProps) => {
  const [dragElement, setDragElement] = useState<boolean>()
  const drop = React.useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.dataTransfer.files)
  }

  useEffect(() => {
    drop.current.addEventListener('dragover', handleDrag)
    drop.current.addEventListener('drop', handleDrop)
    register(name)

    return () => {
      drop.current.removeEventListener('dragover', handleDrag)
      drop.current.removeEventListener('drop', handleDrop)
    }
  }, [register])


  return (
    <div>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        {optional &&
          <span>
            Optional
          </span>}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 h-full" ref={drop}>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor={name}
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
            <span>Upload a file</span>
            <input
              id={name}
              name={name}
              type="file"
              accept={accept}
              className="sr-only h-full" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  )
}