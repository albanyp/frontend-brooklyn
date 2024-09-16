import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon, XMarkIcon, BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Button } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { Search } from 'components/Search/Search'
import { MediaForm } from 'models/Media.model'
import { get } from 'utils/helpers'
import { SearchItem } from 'components/Search/SearchItem.model'
import Brooklyn from '../../brooklyn'

const navigation = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Profile',
    href: ''
  },
  {
    name: 'Create Media',
    href: '/media/create'
  },
]

export const Header = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mediaData, setMediaData] = useState<SearchItem[]>([])

  const logout = () => {
    if (localStorage.getItem("auth")) localStorage.removeItem("auth")
    navigate('/auth/login')
  }

  useEffect(() => {
    (async () => {
      const mediaItems = await get('movies')
      const formattedMediaItems = []
      mediaItems.data.forEach(mediaItem => {
        formattedMediaItems.push({
          id: mediaItem.id,
          name: mediaItem.title
        })
      })
      setMediaData(formattedMediaItems)
    })()
  }, [])

  return (
    <header className="bg-zinc-900 text-zinc-300 border border-zinc-900">
      <nav className="flex items-start justify-start px-2 sm:p-6 lg:px-8" aria-label="Global">
        <div className="flex w-full items-center justify-between">
          <div className="hidden w-4/5 lg:flex lg:justify-between lg:items-center lg:gap-x-8">
            <div className="flex justify-center items-center -ml-2">
              <a href="#">
                <Brooklyn />
              </a>
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-xs mx-4 font-semibold leading-6 text-zinc-300">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md -ml-4 px-4 py-3 sm:p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Button
            value='Log Out'
            variant='tertiary'
            onClick={logout}
            className="text-xs border-0"
          />
          {/* <Search
            data={mediaData}
            navigationSearch
            dataOrigin='movies' /> */}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden transition-all duration-500 ease-in-out" open={isMobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-zinc-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between -ml-2">
              <a href="#" className="-p-1.5">
                <Brooklyn />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white active:bg-violet-800 hover:bg-violet-800"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}