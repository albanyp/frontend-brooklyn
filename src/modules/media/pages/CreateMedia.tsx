import React, { useEffect, useState } from 'react'
import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Header } from 'components/Header/Header'
import { Input } from 'components/Input/Input'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { Button } from 'components/Button/Button'
import { Search } from 'components/Search/Search'
import { get, post } from 'utils/helpers'
import { Dropdown } from 'components/Dropdown/Dropdown'
import { FileUpload } from 'components/FileUpload/FileUpload'
import { Media } from 'models/Media.model'


interface CreateMediaData {
  title: string
  type: string
  franchise: string
  author: string
  producer: string
  releaseDate: Date
  fileUpload: any
  groupName: string
  position: number
}

export const CreateMedia = () => {
  const methods = useForm<Media>()
  const { register, handleSubmit, getValues, watch, formState: { errors } } = methods
  const [franchises, setFranchises] = useState([])
  const [types, setTypes] = useState([])
  let mediaType = watch().typeId

  useEffect(() => {
    (async () => {
      const franchisesData = await get('franchises')
      const typesData = await get('types')
      setFranchises(franchisesData.data)
      setTypes(typesData.data)
      mediaType = typesData.data[0].id
    })()
  }, [])

  const onSubmit = async (data: Media) => {
    try {
      console.log(data)
      if (data.position) data.position = +data.position
      await post('movies/create', data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <FormProvider {...methods}>
      <Header />
      <div className="mx-auto px-4 py-8 sm:px-8">

        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">General Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-4">
                  <Input
                    name="title"
                    register={register}
                    validate={{ required: { value: true, message: 'This field is required' }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                    label="Title"
                    optional={false}
                    containerStyle="mt-4 mb-1" />
                  <span className="text-xs text-red-500">{errors?.title?.message}</span>

                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                    <div className="sm:col-span-3">
                      <Dropdown
                        data={types}
                        name="typeId"
                        register={register}
                        validate={{ required: { value: true, message: 'This field is required' } }}
                        label="Type"
                        optional={false}
                        containerStyle="mt-4 mb-1" />
                      <span className="text-xs text-red-500">{errors?.typeId?.message}</span>
                    </div>

                    <div className="sm:col-span-3">
                      <Search
                        data={franchises}
                        name="franchiseId"
                        register={register}
                        validate={{ pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                        label="Franchise"
                        fullWidth
                        containerStyle="sm:max-w-md mt-4 mb-1" />
                      <span className="text-xs text-red-500">{errors?.franchiseId?.message}</span>
                    </div>
                  </div>

                  <Input
                    name="author"
                    register={register}
                    validate={{ pattern: { value: /[A-Za-z]/, message: 'Please use valid characters' } }}
                    label="Author"
                    containerStyle="mt-4 mb-1" />
                  <span className="text-xs text-red-500">{errors?.author?.message}</span>

                  <Input
                    name="producer"
                    register={register}
                    validate={{ pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                    label="Producer"
                    containerStyle="mt-4 mb-1" />
                  <span className="text-xs text-red-500">{errors?.producer?.message}</span>

                  <Input
                    name="releaseDate"
                    register={register}
                    type="Date"
                    label="Release Date"
                    containerStyle="mt-4 mb-1" />
                  <span className="text-xs text-red-500">{errors?.releaseDate?.message}</span>
                </div>

                <div className="col-span-full">
                  <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600 w-full h-full">
                    <FileUpload
                      register={register}
                      name="logoUrl"
                      label="Upload a file"
                      fullWidth
                      accept="image/png, image/jpeg" />
                  </div>
                </div>
              </div>
            </div>
            {types[0].id !== mediaType && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">For Shows Only</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Nam pulvinar enim ut felis aliquet volutpat. Pellentesque laoreet sagittis nibh, et posuere turpis pretium lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                  <div className="sm:col-span-3">
                    <Input
                      name="groupName"
                      register={register}
                      validate={{ maxLength: { value: 3, message: 'Up to 3 characters' }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                      label="Group Name"
                      containerStyle="mt-4 mb-1" />
                    <span className="text-xs text-red-500">{errors?.groupName?.message}</span>
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      name="position"
                      register={register}
                      validate={{ maxLength: { value: 4, message: 'Up to 4 characters' } }}
                      label="Position"
                      containerStyle="mt-4 mb-1" />
                    <span className="text-xs text-red-500">{errors?.position?.message}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <Button
              type="submit"
              value="Create!"
              primary
              classNames="text-center my-4 sm:max-w-sm"
              fullWidth />
            <Button
              type="reset"
              value="Reset"
              secondary
              classNames="text-center my-4 sm:max-w-sm"
              fullWidth />
          </div>
        </form>
      </div>
    </FormProvider>
  )
}