import React, { useEffect, useState } from "react";
import { InputProps } from "components/Input/Input";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface FileUploadProps extends InputProps {
	name: string;
	label: string;
	accept: string;
	useWatch?: any;
	register?: any;
	setValue?: any;
	secondaryLabel?: string;
	optional?: boolean;
}

export const FileUpload = ({
	accept,
	label,
	name,
	optional = true,
	register,
	setValue,
	useWatch,
	secondaryLabel,
}: FileUploadProps) => {
	const [dragElement, setDragElement] = useState([]);
	const drop = React.useRef(null)

	useEffect(() => {
		if (drop.current) {
			drop.current.addEventListener("dragover", handleDrag);
			drop.current.addEventListener("drop", handleDrop);
		}

		return () => {
			if (drop.current) {
				drop.current.removeEventListener("dragover", handleDrag);
				drop.current.removeEventListener("drop", handleDrop);
			}
		};
	}, [drop])

	// if (useWatch && useWatch(name)) {
		// setDragElement([useWatch(name)]);
	// }

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	const handleDrop = (evt) => {
		evt.preventDefault();
		evt.stopPropagation();
		setDragElement([evt.target.files[0]]);
		setValue(name, evt.target.files[0]);
	}

	const handleFileUploadChange = (item) => {
		setDragElement([item.target.files[0]])
		setValue(name, item.target.files[0]);
	}

	return (
		<>
			<div className="flex justify-between items-center">
				<label
					htmlFor={label}
					className={clsx(
						"text-sm font-medium leading-6 text-gray-900 py-1.5"
						// {
						// 	"text-indigo-600": props.type === "file",
						// 	"font-semibold": props.type === "file",
						// },
					)}
				>
					{label}
				</label>
				{optional && <span>Optional</span>}
			</div>
			<div
				className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 h-full"
				ref={drop}
			>
				<div className="flex flex-col items-center justify-center p-4">
					<div className="flex text-sm leading-6 text-gray-600">
						<label
							htmlFor={name}
							className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
						>
							<span>Upload a file</span>
							<input
								id={name}
								name={name}
								type="file"
								accept={accept}
								// {...register(name)}
								onChange={(evt) => handleFileUploadChange(evt)}
								className="sr-only h-full"
							/>
						</label>
						<p className="pl-1">or drag and drop</p>
					</div>
					<p className="text-xs leading-5 text-gray-600">
						PNG, JPG, GIF up to 10MB
					</p>
				</div>
				<div className="flex justify-center mt-4 ml-8 w-8 rounded-2xl border-2 border-indigo-600 text-sm leading-6 text-gray-600">
					{dragElement.length}
				</div>
			</div>
		</>
	);
};
