import React, { useEffect, useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { InputProps } from "components/Input/Input"
import { Content } from "models/Content.model"
import clsx from 'clsx'
import { useFormContext } from "react-hook-form"

interface DropdownProps extends InputProps {
  data: Content[]
}

export const Dropdown = (props: DropdownProps) => {
  const [selected, setSelected] = useState<Content | undefined>({
    id: '',
    name: ''
  })
  
  const [listData, setListData] = useState<Content[] | undefined>([{
    id: '',
    name: ''
  }])

  const { register } = props
  const { setValue } = useFormContext()

  useEffect(() => {
    if(props.data.length > 0)  {
      setListData(props.data)
      setSelected(props.data[0])
      setValue(props.name, props.data[0].id)
    }
  }, [props.data])

  const setDropdownValue = (evt) => {
    console.log(evt.id)
    setSelected(evt)
    setValue(props.name, evt.id)
  }

  return (
    <div className={props.containerStyle}>

      <Listbox value={selected} onChange={e => setDropdownValue(e)}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{props.label}</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate capitalize">{selected?.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
          
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options onChange={setDropdownValue} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {listData.map((item) => (
                    <Listbox.Option
                      {...register(props.name)}
                      key={item.id}
                      className={({ active }) =>
                        clsx(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9 capitalize'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {item.name}
                          </span>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}