import React, { useEffect, useState } from 'react'
import { InputProps } from 'components/Input/Input'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

interface FileUploadProps extends InputProps {
  name: string
  label: string
  accept: string
  register: any
  secondaryLabel?: string
  optional?: boolean
}

export const FileUpload = ({ accept, label, name, optional = true, register, secondaryLabel }: FileUploadProps) => {
  const [dragElement, setDragElement] = useState<any>([])
  const drop = React.useRef(null)
  const { setValue, watch } = useFormContext()


  useEffect(() => {
    drop.current.addEventListener('dragover', handleDrag)
    drop.current.addEventListener('drop', handleDrop)

    return () => {
      drop.current.removeEventListener('dragover', handleDrag)
      drop.current.removeEventListener('drop', handleDrop)
    }
  }, [drop])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    console.log(evt.dataTransfer.files[0])
    setDragElement([evt.dataTransfer.files[0]])
    setValue(name, `media/${evt.dataTransfer.files[0].name}`)
  }

  const handleFileUploadChange = (evt) => {
    console.log(evt.target.files[0])
    setValue(name, evt.target.files[0].name)
    setDragElement([evt.target.files[0]])
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        {optional &&
          <span>
            Optional
          </span>}
      </div>
      <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 h-full" ref={drop}>
        <div className="flex flex-col items-center justify-center">
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
                // {...register(name)}
                onChange={evt => handleFileUploadChange(evt)}
                className="sr-only h-full" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
        <div className="flex justify-center mt-4 ml-8 w-8 rounded-2xl border-2 border-indigo-600 text-sm leading-6 text-gray-600">
          {dragElement.length}
        </div>
      </div>
    </>
  )
}