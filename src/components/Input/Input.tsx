import * as React from "react";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	register?: any;
  setValue?: any
	optional?: boolean;
	validate?: any;
	label?: string;
	icon?: string;
	inputStyle?: string;
	inputContainerStyle?: string;
	containerStyle?: string;
	optionalStyle?: string;
	labelStyle?: string;
	fullWidth?: boolean;
	isTextarea?: boolean;
}

export const Input = ({
	register,
  	setValue,
	optional = true,
	validate,
	label,
	icon,
	inputContainerStyle,
	containerStyle,
	inputStyle,
	labelStyle,
	optionalStyle,
	fullWidth = true,
	isTextarea = false,
	...props
}: InputProps) => {

	return (
		<div
			className={clsx(
				"flex flex-col",
				{
					"w-full": fullWidth,
				},
				containerStyle
			)}
		>
			<div className="flex justify-between items-center">
				<label
					htmlFor={label}
					className={clsx(
						"text-sm font-medium leading-6 text-gray-900 py-1.5",
						{
							"text-indigo-600": props.type === "file",
							"font-semibold": props.type === "file",
						},
						labelStyle
					)}
				>
					{label}
				</label>
				{optional && (
					<span
						className={clsx("text-sm leading-6 text-gray-500", optionalStyle)}
					>
						Optional
					</span>
				)}
			</div>
			<div
				className={clsx(
					"flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md",
					{
						"w-full": fullWidth,
					},
					inputContainerStyle
				)}
			>
				{!isTextarea ? (
					<input
						{...register(props.name, validate)}
						type={props.type ? props.type : "text"}
						placeholder={props.placeholder}
						defaultValue={props.defaultValue}
						className={clsx(
							"block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
							{ "w-full": fullWidth },
							inputStyle
						)}
					/>
				) : (
					<textarea
						{...register(props.name)}
						rows={4}
						name="description"
						className={clsx(
							{ "w-full": fullWidth },
							"flex rounded-md shadow-sm border-none ring-1 ring-inset ring-gray-300 w-full"
						)}
					></textarea>
				)}
			</div>
		</div>
	);
};
