import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { InputProps } from '../Input/Input'
import { SearchItem } from 'components/Search/SearchItem.model'
import cslx from 'clsx'
import { filteredValues } from './SearchHelpers'

interface SearchProps extends InputProps {
  data: SearchItem[],
  setValue?: any
  control?: any
  useWatch?: any
  dataOrigin?: string
  navigationSearch?: boolean
}

export const Search = ({
  optional: _optional,
  name,
  dataOrigin,
  control,
  setValue,
  register,
  navigationSearch = false,
  ...props
}: SearchProps) => {
  const optional = _optional ?? true
  const [query, setQuery] = useState('')
  const comboboxStyle = cslx('flex', 'flex-col',
    {
      'w-full': props.fullWidth
    },
    props.containerStyle
  )

  const searchValues = filteredValues(props.data, query)
  const inputStyle = navigationSearch ? "border border-zinc-300 bg-zinc-900 text-zinc-300 text-xs px-1.5 py-1.5 ring-offset-transparent focus:ring-transparent ring-0 focus:ring-0" : "border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

  const setFormValue = (item) => {
    if (item.target) {
      setQuery(item.target.value)
      if (setValue) setValue(name, item.target.value)
    } else {
      setQuery(item.name)
      if (setValue) setValue(name, item)
    }
  }

  return (
    <Combobox as="div"
      {...register(name)}
      value={props.useWatch({ name })}
      onChange={(item: SearchItem) => item ? setFormValue(item) : ''} className={comboboxStyle}>
      {!navigationSearch && <div className="flex justify-between">
        <Combobox.Label className="block text-sm font-medium text-left leading-6 text-gray-900">{props.label}</Combobox.Label>
        {optional &&
          <span className="text-sm leading-6 text-gray-500" id="email-optional">
            Optional
          </span>}
      </div>}

      <div className="relative mt-2">
        <Combobox.Input
          autoComplete="off"
          className={cslx("w-full rounded-md", inputStyle)}
          onChange={evt => evt ? setFormValue(evt) : ''}
          displayValue={(item: SearchItem) => item?.name ? item.name : query}
          placeholder={navigationSearch ? 'Title, genre' : ''}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {searchValues.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchValues.map((value) => {
              return (
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
              )
            })}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}