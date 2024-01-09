import React, { useEffect, useState, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { InputProps } from "components/Input/Input"
import { SearchItem } from "components/Search/SearchItem.model"
import clsx from 'clsx'
import { useFormContext } from "react-hook-form"

interface DropdownProps extends InputProps {
  data: SearchItem[]
  useWatch?: any,
  setValue?: any
}

export const Dropdown = ({ data, name, register, setValue, useWatch, ...props}: DropdownProps) => {
  const [selected, setSelected] = useState<SearchItem>()

  const [listData, setListData] = useState<SearchItem[]>([])

  useEffect(() => {
    if (data.length > 0) {
      setListData(data)
    }
  }, [data])

  const setDropdownValue = (value) => {
    setSelected(value)
    setValue(name, value.id)
  }

  return (
    <div className={clsx('w-full', props.containerStyle)}>
      <Listbox
        {...register(name)}
        value={useWatch(name).id || selected?.name}
        onChange={e => setDropdownValue(e)}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{props.label}</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md h-9 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <input className="block truncate capitalize" value={selected?.name} />
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
                      {...register(name)}
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