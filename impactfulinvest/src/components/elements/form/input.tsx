'use client';
import { ChangeEventHandler, useId } from 'react';
import Label, { LabelType } from './label';

export enum InputType {
  Basic = 'Basic',
  Floating = 'Floating',
	Mini = 'Mini'
}

export default function Input({
	value,
	onChange, 
	label,
	placeholder=undefined,
	type='text',
	required=true,
	error='',
	disabled=false,
	readOnly=false,
	autoFocus=false,
	maxLength=undefined,
	minLength=undefined,
	max=undefined,
	min=undefined,
	step=undefined,
	hidden=false,
	inputType=InputType.Floating,
}: {
	value: string,
	onChange: ChangeEventHandler<HTMLInputElement> | undefined,
	label: string,
	placeholder?: string | undefined,
	type?: string,
	disabled?: boolean,
	error?: string,
	required?: boolean,
	readOnly?: boolean,
	autoFocus?: boolean,
	maxLength?: number | undefined,
	minLength?: number | undefined,
	max?: number | undefined,
	min?: number | undefined,
	step?: number | undefined,
	hidden?: boolean,
	inputType?: InputType,
}) {
	const id = useId();
	let ret = null;
	switch (inputType) {
		case InputType.Floating:
			ret = <div className={`form-label-group bg-white rounded`}>
				<input
					className={`w-full rounded border
						shadow-inner bg-gray-100 outline:border-black text
						${error ? 'border-error' : 'border-gray-100 focus:border-black'}
						p-3`}
					id={id}
					value={value}
					onChange={onChange}

					required={required}
					placeholder={placeholder ? placeholder : label}
					type={type}

					disabled={disabled}
					readOnly={readOnly}
					autoFocus={autoFocus}

					min={min}
					max={max}
					step={step}

					minLength={minLength}
					maxLength={maxLength}

					hidden={hidden}
				/>
				<Label
					htmlFor={id}
					labelType={LabelType.Floating}
					value={label}/>
			</div>
			break;
		case InputType.Mini:
			ret = <input
				className={`w-full rounded border appearance-none
					shadow-inner bg-gray-100 outline:border-black text
					${error ? 'border-error' : 'border-gray-100 focus:border-black'}
					p-1`}
				id={id}
				value={value}
				onChange={onChange}

				required={required}
				placeholder={placeholder ? placeholder : label}
				type={type}

				disabled={disabled}
				readOnly={readOnly}
				autoFocus={autoFocus}

				min={min}
				max={max}
				step={step}

				minLength={minLength}
				maxLength={maxLength}

				hidden={hidden}
			/>
			break;
		default:
			ret = <div className='flex flex-col'>
				<Label
					htmlFor={id}
					labelType={LabelType.Basic}
					value={label}/>
				<input
					className={`border rounded
						shadow-inner bg-gray-100 outline:border-black
						${error ? 'border-error' : 'border-gray-100 focus:border-black '}
						p-3`
					}
					id={id}
					value={value}
					onChange={onChange}
	
					required={required}
					placeholder={placeholder ? placeholder : label}
					type={type}
	
					disabled={disabled}
					readOnly={readOnly}
					autoFocus={autoFocus}
	
					min={min}
					max={max}
					step={step}
	
					minLength={minLength}
					maxLength={maxLength}
	
					hidden={hidden}
				/>
			</div>
	}
	return <>
		{ ret }
		{ error ? 
			<div className='text-sm mt-2 text-error'>
				{error}
			</div>
			: null
		}
	</>;
}