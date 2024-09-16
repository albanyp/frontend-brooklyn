import { Dialog, Transition } from "@headlessui/react";
import {
	XMarkIcon,
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
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}/>
				</Transition.Child>

				<div className="fixed overflow-y-auto w-11/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 sm:w-9/12">
					<div className="flex justify-center text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform w-11/12 rounded-lg bg-zinc-900 text-left shadow-xl transition-all md:w-10/12 lg:w-8/12 lg:h-5/6">
								<div className="z-10 absolute left-4 top-2 mr-5">
									<div className="absolute sm:block">
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
										className="relative top-0 left-0 rounded-lg mb-0 h-4/6 sm:mb-6 w-full"
									/>
								</div>
								<div className="flex p-4">
									<div className="flex flex-col items-start w-full">
										<Dialog.Title
											as="h1"
											className="text-lg sm:text-3xl font-semibold leading-6 text-zinc-300 mb-4"
										>
											{content?.title}
											<br />
										</Dialog.Title>
										<div className="flex flex-col sm:flex-row text-zinc-300 text-sm md:text-base">
											<p className="my-4 mr-4 w-full sm:w-8/12">
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
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
