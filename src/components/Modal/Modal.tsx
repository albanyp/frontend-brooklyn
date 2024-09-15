import { Dialog, Transition } from "@headlessui/react";
import {
	XMarkIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuItem } from "components/Menu/Menu";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { remove } from "utils/helpers";

export const Modal = ({ content, show, onClose }: any) => {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	const handleEdit = () => {
		navigate(`/media/${content?.id}`, { replace: true });
	};

	const handleDelete = async () => {
		try {
			await remove(`movies/${content?.id}`);
			navigate(`/`, { replace: true });

			toast.success("Success!", {
				position: "top-right",
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			onClose();
		} catch (err) {
			toast.error(err.message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const menuItems: MenuItem[] = [
		{
			name: "Edit",
			onClick: handleEdit,
		},
		{
			name: "Delete",
			onClick: handleDelete,
		},
	];

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform rounded-lg bg-zinc-900 text-left shadow-xl transition-all sm:w-8/12">
								<div className="z-10 absolute left-4 top-2 mr-5">
									<div className="absolute hidden sm:block">
										<button
											type="button"
											className="rounded-full p-1 bg-zinc-900 text-zinc-300 focus:outline-none"
											onClick={onClose}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
								</div>
								<div className="z-10 absolute right-1 top-2 mr-4">
									<Menu menuItems={menuItems} />
								</div>

								<div className="w-full">
									<img
										src={
											content &&
											`${process.env.REACT_APP_BASE_URL}/${content.coverUrl}`
										}
										className="relative top-0 left-0 rounded-lg mb-6 w-full"
									/>
								</div>
								<div className="flex p-4">
									<div className="flex flex-col items-start w-full">
										<Dialog.Title
											as="h1"
											className="text-xl sm:text-4xl font-semibold leading-6 text-zinc-300 mb-4"
										>
											{content?.title}
											<br />
											{/* {content ? content.title : 'no loaded content'} */}
										</Dialog.Title>
										<div className="flex text-zinc-300">
											<p className="my-4 mr-4 w-8/12">
                        {content?.description}
											</p>
											<div className="my-4">
												<div className="flex flex-col">
													<div className="flex w-full">
														<p className="text-zinc-500 mr-1">Author:</p>
														<p className="text-zinc-300">
															{content?.author && content.author}
														</p>
													</div>

													<div className="flex w-full">
														<p className="text-zinc-500 mr-1">Producer:</p>
														<p className="text-zinc-300">
															{content?.producer && content.producer}
														</p>
													</div>
													{/* </div> */}

													{/* <div className="flex"> */}
													<div className="flex w-full">
														<p className="text-zinc-500 mr-1">Release Date:</p>
														<p className="text-zinc-300">
															{content?.releaseDate &&
																content.releaseDate.slice(0, 10)}
														</p>
													</div>

													<div className="flex w-full">
														<p className="text-zinc-500 mr-1">Position:</p>
														<p className="text-zinc-300">
															{content?.position && content.position}
														</p>
													</div>
												</div>
											</div>
											{/* <div></div> */}
										</div>
									</div>
								</div>
								{/* <div className="sm:flex sm:items-start">
									<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
											{/* {content.title} */}
								{/* {content?.title}
											<br />
											{content? content.title : 'no loaded content'}
										</Dialog.Title> */}
								{/* <div className="mt-2">
						<p className="text-sm text-gray-500">
						  Are you sure you want to deactivate your account? All of your data will be permanently removed
						  from our servers forever. This action cannot be undone.
						</p>
					  </div> */}
								{/* </div>
								</div> */}
								{/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
										onClick={() => setOpen(false)}
									>
										Deactivate
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										onClick={() => setOpen(false)}
									>
										Cancel
									</button>
								</div> */}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
