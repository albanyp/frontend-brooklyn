import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { InputProps } from '../Input/Input'
import { Content } from 'models/Content.model'
import cslx from 'clsx'

interface SearchProps extends InputProps {
  data: Content[]
}

export const Search = ({ optional = true, ...props }: SearchProps) => {
  const [query, setQuery] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)
  const comboboxStyle = cslx('flex', 'flex-col',
    {
      'w-full': props.fullWidth
    },
    props.containerStyle
  )

  const matchStrings = (input: string, value: string) => {
    for (let character = 0; character < value.length; character++) {
      if ((input.charAt(character)) !== value.charAt(character)) {
        return false
      }
    }

    return true
  }

  const filteredValues = props.data.filter((item, i) => {
    if (matchStrings((item.name).toLowerCase(), (query).toLowerCase())) {
      return item.name
    } 
  })

  // alternate solution
  // const filteredValues = props.data.filter(d => {
  //   const regex = new RegExp(`[${query}]`, 'i')
  //   return d.name.match(regex)
  // })


  return (
    <Combobox as="div" value={selectedValue} onChange={setSelectedValue} className={comboboxStyle}>
      <div className="flex justify-between">
        <Combobox.Label className="block text-sm font-medium text-left leading-6 text-gray-900">{props.label}</Combobox.Label>
        {optional &&
          <span className="text-sm leading-6 text-gray-500" id="email-optional">
            Optional
          </span>}
      </div>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900  ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={event => setQuery(event.target.value)}
          displayValue={(item: Content) => item?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredValues.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredValues.map((value) => (
              <Combobox.Option
                key={value.id}
                value={value}
                className={({ active }) =>
                  cslx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span>{value.name}</span>

                    {selected && (
                      <span
                        className={cslx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}