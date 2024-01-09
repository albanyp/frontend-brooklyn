import React from 'react'
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
    href: '/movies/create'
  },
  {
    name: 'Search Content',
    href: '/movies/'
  }
]

export const Header = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logout = () => {
    if (localStorage.getItem("auth")) localStorage.removeItem("auth")
    navigate('/auth/login')
  }

  return (
    <header className="bg-white border border-gray-200">
      <nav className="flex max-w-7xl items-start justify-start px-2 sm:p-6 lg:px-8" aria-label="Global">
        <div className="flex w-full items-center justify-between">
          <div className="hidden w-full lg:flex lg:justify-between lg:items-center lg:gap-x-12">
            <div className="flex justify-center items-center">
              <a href="#">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm mx-4 font-semibold leading-6 text-gray-900">
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
            className="text-xs sm:text-sm"
          />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={isMobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between">
              <a href="#" className="-p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  alt=""
                />
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
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
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