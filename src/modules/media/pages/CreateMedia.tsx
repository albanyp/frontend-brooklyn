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
import { Media, MediaForm, MediaRequest } from 'models/Media.model'
import { Franchise } from 'models/Franchise.model'
// import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toast'



export const CreateMedia = () => {
  const methods = useForm<MediaForm>()
  const { register, handleSubmit, getValues, watch, formState: { errors } } = methods
  const [franchises, setFranchises] = useState([])
  const [types, setTypes] = useState([])
  let mediaType = watch().typeId
  // const notify = () => {
  //   toast.error('Error notification!', {
  //     position: 'top-right',
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }

  const notify = () => {
    toast('hi')
  }

  useEffect(() => {
    (async () => {
      const franchisesData = await get('franchises')
      const typesData = await get('types')
      setFranchises(franchisesData.data)
      setTypes(typesData.data)
      mediaType = typesData.data[0].id
    })()
  }, [])

  const onSubmit = async (data: MediaForm) => {
    console.log(data)
    try {
      const requestBody: MediaRequest = {
        title: data.title,
        typeId: data.typeId,
        author: data.author,
        releaseDate: data.releaseDate,
        groupName: data.groupName,
        position: data.position,
        producer: data.producer,
        logoUrl: data.logoUrl,
        franchiseId: ''
      }

      if (typeof data.franchise === 'string') {
        const newFranchise = await post(`franchises/create`, {
          name: data.franchise
        })

        requestBody.franchiseId = newFranchise.id
      } else {
        requestBody.franchiseId = data.franchise.id
      }

      if (data.position) data.position = +data.position
      if (typeof data.releaseDate === 'string') data.releaseDate = null

      // await post('movies/create', requestBody)
    } catch (err) {
      // console.log(Object.keys(err))
      // console.log('error???')
      notify()
      console.log(err.message)
    }
  }


  return (
    <FormProvider {...methods}>
      <Header />
      <div className="mx-auto px-4 py-8 sm:px-8">

        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          {/* <ToastContainer /> */}
        <button type='button' onClick={notify}>Notify!</button>
        <ToastContainer/>
          <div className="space-y-12">
            <div className="flex flex-col items-center border-b border-gray-900/10 pb-12">
              <div className="flex max-w-md w-full flex-col">
                <div className="justify-self-start self-start">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">General Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <Input
                  name="title"
                  register={register}
                  validate={{ required: { value: true, message: 'This field is required' }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                  label="Title"
                  optional={false}
                  containerStyle="mt-4 mb-1" />
                <span className="text-xs text-red-500">{errors?.title?.message}</span>

                <div className="flex justify-between">
                  <div className="flex w-6/12 mr-4">
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

                  <div className="flex w-6/12">
                    <Search
                      data={franchises}
                      name="franchise"
                      register={register}
                      validate={{ required: { value: false }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                      label="Franchise"
                      dataOrigin='franchises'
                      fullWidth
                      containerStyle="sm:max-w-md mt-4 mb-1" />
                    <span className="text-xs text-red-500">{errors?.franchiseId?.message}</span>
                  </div>
                </div>

                <Input
                  name="author"
                  register={register}
                  validate={{ required: { value: false }, pattern: { value: /[A-Za-z]/, message: 'Please use valid characters' } }}
                  label="Author"
                  containerStyle="mt-4 mb-1" />
                <span className="text-xs text-red-500">{errors?.author?.message}</span>

                <Input
                  name="producer"
                  register={register}
                  validate={{ required: { value: false }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                  label="Producer"
                  containerStyle="mt-4 mb-1" />
                <span className="text-xs text-red-500">{errors?.producer?.message}</span>

                <Input
                  name="releaseDate"
                  register={register}
                  type="Date"
                  // validate={{ required: { value: false } }}
                  label="Release Date"
                  defaultValue={null}
                  containerStyle="mt-4 mb-1" />
                <span className="text-xs text-red-500">{errors?.releaseDate?.message}</span>
                {/* </div> */}

                <div className="">
                  <div className="flex flex-col text-sm leading-6 text-gray-600 max-w-md mt-4">
                    <FileUpload
                      register={register}
                      name="logoUrl"
                      label="Upload a file"
                      validate={{ required: { value: false } }}
                      fullWidth
                      accept="image/png, image/jpeg" />
                  </div>
                </div>
                {types[0]?.id !== mediaType && (
                  <div className="flex flex-col border-b border-gray-900/10 pb-12 mt-6">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">For Shows Only</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">Nam pulvinar enim ut felis aliquet volutpat. Pellentesque laoreet sagittis nibh, et posuere turpis pretium lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
                    </div>

                    <div className="flex max-w-2xl">
                      <div className="mr-4">
                        <Input
                          name="groupName"
                          register={register}
                          validate={{ required: { value: false }, maxLength: { value: 3, message: 'Up to 3 characters' }, pattern: { value: /[A-Za-z]/g, message: 'Please use valid characters' } }}
                          label="Group Name"
                          containerStyle="mt-4 mb-1" />
                        <span className="text-xs text-red-500">{errors?.groupName?.message}</span>
                      </div>

                      <div className="">
                        <Input
                          name="position"
                          type='number'
                          defaultValue={1}
                          register={register}
                          validate={{ required: { value: false }, maxLength: { value: 4, message: 'Up to 4 characters' } }}
                          label="Position"
                          containerStyle="mt-4 mb-1" />
                        <span className="text-xs text-red-500">{errors?.position?.message}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-center gap-x-6">
                  <Button
                    type="submit"
                    value="Create!"
                    fullWidth
                    className="text-center my-4 sm:max-w-sm" />
                  <Button
                    type="reset"
                    value="Reset"
                    variant="secondary"
                    fullWidth
                    className="text-center my-4 sm:max-w-sm" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}