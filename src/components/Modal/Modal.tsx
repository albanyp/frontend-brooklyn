import React, { useState } from 'react'

export const Modal = ({ show }: any) => {
  const [open, setOpen] = useState(true)

	return (
		// <dialog>
			<div className="fixed top-2/4 left-2/4 p-5 bg-white border border-white z-50">
				pop up component
			</div>
		// </dialog>
	)
}