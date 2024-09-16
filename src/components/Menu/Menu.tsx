import React, { useState, useEffect } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';

export interface MenuItem {
	name: string
	onClick: () => void
}

interface MenuItemsProps {
	menuItems: MenuItem[]
}

export const Menu = ({ menuItems = [] }: MenuItemsProps) => {
	const [items, setItems] = useState([]);
	const navigate = useNavigate()

	useEffect(() => {
		if (menuItems.length > 0) {
			setItems(menuItems)
		}
	}, menuItems)

	return (
		<HeadlessMenu>
			<HeadlessMenu.Button className="flex flex-col items-center justify-center p-1 w-8 h-8 rounded-full ring-0 cursor-pointer bg-zinc-900 focus:outline-none">
				<div className="w-0.5 h-0.5 bg-zinc-300"></div>
				<div className="w-0.5 h-0.5 bg-zinc-300 mt-1"></div>
				<div className="w-0.5 h-0.5 bg-zinc-300 mt-1"></div>
			</HeadlessMenu.Button>
			<HeadlessMenu.Items className="absolute right-1 bg-white rounded w-24">
				{menuItems.map(menuItem => {
					return (
						<HeadlessMenu.Item key={menuItem.name}>
							{({ active }) => (
								<button
									className={`${active && 'bg-violet-700 text-white'} text-left block py-2 px-4 w-full`}
									onClick={menuItem.onClick}
								>
									{menuItem.name}
								</button>
							)}
						</HeadlessMenu.Item>
					);
				})}
			</HeadlessMenu.Items>
		</HeadlessMenu>
	)
}
