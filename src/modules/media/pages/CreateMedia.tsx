import React, { useEffect, useMemo, useState } from "react";
import { Header } from "components/Header/Header";
import { Input } from "components/Input/Input";
import {
	FormProvider,
	useForm,
	useWatch,
} from "react-hook-form";
import { Button } from "components/Button/Button";
import { Search } from "components/Search/Search";
import { get, post, postMedia, put, putMedia } from "utils/helpers";
import { Dropdown } from "components/Dropdown/Dropdown";
import { FileUpload } from "components/FileUpload/FileUpload";
import { MediaForm, MediaRequest } from "models/Media.model";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const CreateMedia = () => {
	const methods = useForm<MediaForm>({
		defaultValues: {
			title: "",
			typeId: "",
			franchise: "",
			author: "",
			producer: "",
			logoFile: null,
			coverFile: null,
			releaseDate: null,
			position: 1,
			groupName: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = methods;

	const register = useMemo(() => methods.register, [methods.register]);
	const setValue = useMemo(() => methods.setValue, [methods.setValue]);

	const [franchises, setFranchises] = useState([]);
	const [types, setTypes] = useState([]);
	const [loader, setLoader] = useState<boolean>(false);
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		try {
			(async () => {
				if (params && params.id) {
					// TO DO
					// type for media item
					const mediaItem = await get(`movies/${params.id}`);
					const formattedReleaseDate = mediaItem.releaseDate
						.toString()
						?.slice(0, 10);
        					
					reset({
						title: mediaItem.title,
						typeId: mediaItem.mediaType,
						description: mediaItem.description,
						franchise: mediaItem.franchise,
						author: mediaItem.author,
						releaseDate: formattedReleaseDate,
						groupName: mediaItem.groupName,
						position: mediaItem.position,
						producer: mediaItem.producer,
						logoFile: mediaItem.logoUrl,
						coverFile: mediaItem.coverFile,
					});
				}

				const franchisesData = await get("franchises");
				const typesData = await get("types");
				setFranchises(franchisesData.data);
				setTypes(typesData.data);
			})();
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
	}, []);

	const onSubmit = async (data: MediaForm) => {
		setLoader(true);
		let formData = new FormData();

		try {
			const requestBody: MediaRequest = {
				title: data.title,
				typeId: data.typeId,
				description: data.description,
				author: data.author,
				releaseDate: data.releaseDate,
				groupName: data.groupName,
				position: data.position,
				producer: data.producer,
				logoFile: data.logoFile,
				coverFile: data.coverFile,
			};

			let newMedia;

			if (typeof data.franchise === "string") {
				if (data.franchise.length > 0) {
					const newFranchise = await post(`franchises/create`, {
						name: data.franchise,
					});

					data.franchiseId = newFranchise.id;
				}
			} else {
				data.franchiseId = data.franchise?.id;
			}

			if (data.groupName) requestBody.groupName = data.groupName;
			if (data.position) requestBody.position = +data.position;

			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					if(key !== 'franchise') {
						formData.append(key, data[key]);
					}
				}
			}

			if (params && params.id) {
				newMedia = await putMedia(`movies/update/${params.id}`, formData);
			} else {
				newMedia = await postMedia("movies/create", formData);
				navigate(`/?media_id=${newMedia.id}`, { replace: true });
			}

			toast.success("Success!", {
				position: "top-right",
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} catch (err) {
			toast.error(err.message, {
				position: "top-right",
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		setLoader(false);
	};

	console.log('errors', errors)

	return (
		<FormProvider {...methods}>
			<Header />
			<div className="mx-auto px-4 py-8 sm:px-8">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-12">
						<div className="flex flex-col items-center border-b border-gray-900/10 pb-12">
							<div className="flex max-w-md w-full flex-col">
								<div className="justify-self-start self-start">
									<h2 className="text-base font-semibold leading-7 text-gray-900">
										General Information
									</h2>
									<p className="mt-1 text-sm leading-6 text-gray-600">
                  Please provide the details for your media item. This will help us keep everything organized and make sure it's easy to find and manage later.
									</p>
								</div>
								<Input
									name="title"
									register={register}
									setValue={setValue}
									validate={{
										required: {
											value: true,
											message: "This field is required",
										},
										pattern: {
											value: /[A-Za-z]/g,
											message: "Please use valid characters",
										},
									}}
									label="Title"
									optional={false}
									containerStyle="mt-4 mb-1"
								/>
								<span className="text-xs text-red-500">
									{errors?.title?.message}
								</span>

								<div className="flex justify-between">
									<div className="flex flex-col w-6/12 mr-4">
										<Dropdown
											data={types}
											name="typeId"
											useWatch={useWatch}
											register={register}
											setValue={setValue}
											validate={{
												required: {
													value: true,
													message: "This field is required",
												},
											}}
											label="Type"
											optional={false}
											containerStyle="mt-4 mb-1"
										/>
										<span className="text-xs text-red-500">
											{errors?.typeId?.message}
										</span>
									</div>

									<div className="flex w-6/12">
										<Search
											data={franchises}
											name="franchise"
											register={register}
											useWatch={useWatch}
											control={control}
											setValue={setValue}
											validate={{
												required: { value: false },
												pattern: {
													value: /[A-Za-z]/g,
													message: "Please use valid characters",
												},
											}}
											label="Franchise"
											dataOrigin="franchises"
											fullWidth
											containerStyle="sm:max-w-md mt-4 mb-1"
										/>
										<span className="text-xs text-red-500">
											{errors?.franchiseId?.message}
										</span>
									</div>
								</div>

								<Input
									name="author"
									register={register}
									setValue={setValue}
									validate={{
										required: { value: false },
										pattern: {
											value: /[A-Za-z]/,
											message: "Please use valid characters",
										},
									}}
									label="Author"
									containerStyle="mt-4 mb-1"
								/>
								<span className="text-xs text-red-500">
									{errors?.author?.message}
								</span>

								<Input
									name="producer"
									register={register}
									setValue={setValue}
									validate={{
										required: { value: false },
										pattern: {
											value: /[A-Za-z]/g,
											message: "Please use valid characters",
										},
									}}
									label="Producer"
									containerStyle="mt-4 mb-1"
								/>
								<span className="text-xs text-red-500">
									{errors?.producer?.message}
								</span>

								<Input
									name="releaseDate"
									register={register}
									setValue={setValue}
									type="Date"
									label="Release Date"
									containerStyle="mt-4 mb-1"
								/>
								<span className="text-xs text-red-500">
									{errors?.releaseDate?.message}
								</span>

								<div>
									<div className="flex justify-between items-center">
										<Input
											register={register}
											setValue={setValue}
											name="description"
											label="Synopsis"
											containerStyle="mt-4 mb-1"
											fullWidth
											isTextarea
										/>
									</div>
								</div>
								<div className="flex flex-col text-sm leading-6 text-gray-600 max-w-md mt-4">
									<FileUpload
										register={register}
										useWatch={useWatch}
										setValue={setValue}
										name="logoFile"
										label="Logo Image"
										validate={{ required: { value: false } }}
										accept="image/png, image/jpeg"
									/>
								</div>
								<div className="flex flex-col text-sm leading-6 text-gray-600 max-w-md mt-4">
									<FileUpload
										register={register}
										useWatch={useWatch}
										setValue={setValue}
										name="coverFile"
										label="Cover Image"
										validate={{ required: { value: false } }}
										accept="image/png, image/jpeg"
									/>
								</div>
								{/* {types[0]?.id !== mediaType && ( */}
								<div className="flex flex-col border-b border-gray-900/10 pb-12 mt-8">
									<div>
										<h2 className="text-base font-semibold leading-7 text-gray-900">
											For Shows and Franchises
										</h2>
										<p className="mt-1 text-sm leading-6 text-gray-600">
											Please fill only for episodic media items. Thank you!
										</p>
									</div>

									<div className="flex max-w-2xl">
										<div className="mr-4">
											<Input
												name="groupName"
												register={register}
												setValue={setValue}
												validate={{
													required: { value: false },
													maxLength: {
														value: 3,
														message: "Up to 3 characters",
													},
												}}
												label="Group Name"
												containerStyle="mt-4 mb-1"
											/>
											<span className="text-xs text-red-500">
												{errors?.groupName?.message}
											</span>
										</div>

										<div className="">
											<Input
												name="position"
												type="number"
												register={register}
												setValue={setValue}
												validate={{
													required: { value: false },
													maxLength: {
														value: 4,
														message: "Up to 4 characters",
													},
												}}
												defaultValue={1}
												label="Position"
												containerStyle="mt-4 mb-1"
											/>
											<span className="text-xs text-red-500">
												{errors?.position?.message}
											</span>
										</div>
									</div>
								</div>
								{/* )} */}
								<div className="mt-3 flex items-center justify-center gap-x-6">
									<Button
										type="submit"
										value={params && params.id ? "Save Changes" : "Create!"}
										loading={loader ? loader : undefined}
										fullWidth
										className="text-center my-4 sm:max-w-sm"
									/>
									<Button
										type="reset"
										value="Reset"
										variant="secondary"
										fullWidth
										className="text-center my-4 sm:max-w-sm"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</FormProvider>
	);
};
