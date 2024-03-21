'use client';

import Sketch from '@uiw/react-color-sketch';
import { useId, useRef, useState } from 'react';
import { Svg } from '../elements';
import useSelect from '@/hooks/select';
import { arrayBufferToBase64Svg } from '@/utils/utils';

enum InputType {
	TEXT = 'text',
	MULTI_TEXT = 'multiText',
	NUMBER = 'number',
	SELECT = 'select',
	COLOR = 'color',
	FILE = 'file'
};

// TODO: maybe move this to models? (since it will be expanded with other Data)
interface OneInputType {
	label: string;
	key: string;
	defaultValue?: string | number;
};

interface ColorInputType extends OneInputType{
	type: InputType.COLOR;
	defaultValue: string;
};

interface NumberInputType extends OneInputType {
	type: InputType.NUMBER;
	defaultValue?: number;
	min?: number;
	max?: number;
}

interface TextInputType extends OneInputType {
	type: InputType.TEXT;
	defaultValue?: string;
}

interface MultiTextInputType extends OneInputType {
	type: InputType.MULTI_TEXT;
	defaultValue?: string;
}

interface SelectInputType extends OneInputType {
	type: InputType.SELECT;
	options: JSX.Element[];
	values: string[];
	defaultValue?: string;
}

interface FileInputType extends OneInputType {
	type: InputType.FILE;
	text: string;
	height: string;
	accept: string;
}

type InputsType = OneInputType[];

function ColorInput({
	labelText,
	color,
	setColor,
	width,
}:{
	labelText: string,
	color: string,
	setColor: (color: string) => void,
	width?: string,
}) {
	const selectRef = useRef(null);
	const optionRef = useRef(null);
	const {show} = useSelect(selectRef, optionRef);
	return <div ref={selectRef} className={`cursor-pointer transition-all
			${show ? 'border-gray-300': 'border-gray-100 hover:border-gray-300'}
			rounded-full`}>
		<div className='w-10 h-10 rounded-full border-8 border-gray-100 shadow-inner'
				style={{backgroundColor: color}}>
		</div>
		{ show && <div ref={optionRef} className='absolute left-0 top-full mt-2 z-30 animate-scale'
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<Sketch
					style={{
						width: '100%',
						backgroundColor: 'white',
						border: 'none',
					}}
					color={color}
					disableAlpha={true}
					onChange={(color) => {
						setColor(color.hex);
					}}
				/>
			</div>
		}
	</div>
}


function ColorLabelInput({
	labelText,
	color,
	setColor,
}:{
	labelText: string,
	color: string,
	setColor: (color: string) => void,
}) {
	const selectRef = useRef(null);
	const optionRef = useRef(null);
	const {show} = useSelect(selectRef, optionRef);
	return <div className='flex justify-between items-center'>
		<label className='font-semibold'>
			{labelText}
		</label>
		<div ref={selectRef} className={`cursor-pointer transition-all
				${show ? 'border-gray-300': 'border-gray-100 hover:border-gray-300'}
				rounded-full`}>
			<div className='w-10 h-10 rounded-full border-8 border-gray-100 shadow-inner'
					style={{backgroundColor: color}}>
			</div>
			{ show && <div ref={optionRef} className='absolute right-12 bottom-0 mt-2 z-30 animate-scale'
					onClick={(e) => {
						e.stopPropagation();
					}}>
					<Sketch
						style={{
							width: '100%',
							backgroundColor: 'white',
							border: 'none',
						}}
						color={color}
						disableAlpha={true}
						onChange={(color) => {
							setColor(color.hex);
						}}
					/>
				</div>
			}
		</div>
	</div>
}

function SelectInput({
	label,
	currentSelection,
	onChange,
	options,
	values,
	width
}: {
	label: string,
	currentSelection: JSX.Element,
	onChange: (value: string) => void,
	values: string[],
	options: JSX.Element[],
	width: string,
}) {
	const selectRef = useRef<HTMLDivElement | null>(null);
	const optionRef = useRef<HTMLDivElement | null>(null);
	const {show, setShow} = useSelect(selectRef, optionRef);
	return <div className='flex justify-between items-center'>
		<label>
			{label}
		</label>
		<div ref={selectRef} className={`relative ${width} flex justify-between cursor-pointer rounded
				bg-gray-100 shadow-inner
				p-2`}>
			{currentSelection}
			{ show && <div ref={optionRef}
					className={`absolute ${width} max-h-[200px] overflow-x-hidden overflow-y-auto left-0 top-full rounded z-20
						shadow-floating 
						animate-scale`}>
					<div className='flex flex-col'>
						{options.map((option, index) => {
							return <div key={index} onClick={(e) => {
									onChange(values[index]);
									setShow(false);
								}}>
								<div key={index} className='w-full transition-colors
									bg-white hover:bg-gray-200
									p-2'>
									{option} 
								</div>
							</div>
						})}
					</div>
				</div>
			}
		</div>
	</div>
}

function SelectSimpleInput({
	label,
	options,
	value,
	setValue,
	width,
}: {
	label: string,
	options: JSX.Element[],
	value: JSX.Element,
	setValue: (value: string) => void,
	width: string,
}) {
	const [show, setShow] = useState(false);
	return <div className='flex justify-between items-center'>
		<label>
			{label}
		</label>
		<div className={`relative flex justify-between border cursor-pointer
				border-gray-300 rounded
				p-1`}
				onClick={(e) => {
					e.stopPropagation();
				}}>
			{value}
			{ show && <div 
					className={`absolute ${width ? width : 'w-36'} max-h-[200px] overflow-x-hidden overflow-y-auto left-0 top-full rounded z-20 border
					border-gray-300 shadow-floating 
					animate-scale`}>
					<div className='flex flex-col'>
						{options}
					</div>
				</div>
			}
		</div>
	</div>
}

function FullTextInput({
	label,
	value,
	setValue,
}: {
	label: string,
	value: string,
	setValue: (value: string) => void,
}) {
	const id = useId();
	return<div className='flex flex-col mb-4'>
		<label htmlFor={id} className='font-semibold mb-2'>
			{label}
		</label>
		<input
			id={id}
			className='w-full rounded shadow-inner bg-gray-100 px-4 py-2'
			type='text'
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
		/>
	</div>
}

function TextInput({
	label,
	value,
	setValue,
}: {
	label: string,
	value: string,
	setValue: (value: string) => void,
}) {
	const id = useId();
	return<div className='flex mb-4'>
		<label htmlFor={id} >
			{label}
		</label>
		<div className='flex flex-row-reverse'>
			<input
				id={id}
				className='w-36 rounded shadow-floating p-1'
				type='text'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		</div>
	</div>
}

function MultiTextInput({
	label,
	value,
	setValue,
}: {
	label: string,
	value: string,
	setValue: (value: string) => void,
}) {
	const id = useId();
	return<div className='flex flex-col mb-4'>
		<label htmlFor={id} className='font-semibold mb-2'>
			{label}
		</label>
		<textarea
			id={id}
			rows={4}
			className='w-full rounded shadow-inner bg-gray-100 px-4 py-2'
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
		/>
	</div>
}

function NumberInput({
	label,
	value,
	setValue,
	min,
	max,
}: {
	label: string,
	value: number,
	setValue: (value: number) => void,
	min?: number,
	max?: number,
}) {
	const id = useId();
	return <div className='flex justify-between items-center mb-4'>
		<label htmlFor={id} >
			{label}
		</label>
		<input
			id={id}
			className='w-36 rounded p-2 bg-gray-100 shadow-inner'
			type='number'
			value={value}
			min={min}
			max={max}
			onChange={(e) => {
				setValue(Number(e.target.value));
			}}
		/>
	</div>
}

function FullNumberInput({
	label,
	value,
	setValue,
	min,
	max,
}: {
	label: string,
	value: number,
	setValue: (value: number) => void,
	min?: number,
	max?: number,
}) {
	const id = useId();
	return <div className='flex flex-col mb-4'>
		<label htmlFor={id} className='font-semibold mb-2'>
			{label}
		</label>
		<input
			id={id}
			className='w-full rounded px-4 py-2 shadow-inner bg-gray-100'
			type='number'
			value={value}
			min={min}
			max={max}
			onChange={(e) => {
				setValue(Number(e.target.value));
			}}
		/>
	</div>
}

function FullFileInput({
	label,
	value,
	setValue,
	text,
	accept,
	height,
}: {
	label: string,
	value: ArrayBuffer | null,
	setValue: (value: any) => void,
	text: string,
	accept: string,
	height: string
}) {
	const id = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(value ? arrayBufferToBase64Svg(value) : null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const buffer = await file.arrayBuffer();
    setValue(buffer);
		setImageSrc(arrayBufferToBase64Svg(buffer));
    setDragOver(false);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const buffer = await file.arrayBuffer();
      setValue(buffer);
      setImageSrc(arrayBufferToBase64Svg(buffer));
			setDragOver(false);
    }
  };

	const Content = () => {
		if (dragOver) {
			return <span className=''>
				Release to upload
			</span> 
		} else if (imageSrc) {
			return <div className='group relative w-full h-full max-w-full max-h-full 
							flex items-center justify-center
							p-2'>
					<img src={imageSrc} alt='uploaded' className='rounded max-w-full max-h-full object-contain'/>
					<div className='flex absolute left-0 top-0 right-0 bottom-0 opacity-0 group-hover:opacity-60
						transition-opacity
						items-center justify-center rounded 
						text-black
						bg-gray-500'
						onClick={(e) => {
							e.stopPropagation();
							setValue(null);
							setImageSrc(null);
							setDragOver(false);
							if (fileInputRef.current) {
								fileInputRef.current.value = '';
							}
						}}>
					<Svg src='/fontawesome/svgs/light/times.svg' className='w-12 h-12 bg-black'/>
				</div>
			</div>
		} 
		return <>
			<Svg src='/fontawesome/svgs/light/cloud-upload.svg' className='w-8 h-8 bg-gray-500 mb-2'/>
			<div className='text-sm text-center unselectable
					text-gray-500'>
				<span className='font-semibold mb-4'>
					Click to upload
				</span> or drag and drop
				<br/>
				<span className=''>
					{text}
				</span>
			</div>
		</>
	};

	return <div className='flex flex-col mb-4'>
		<label htmlFor={id} className='font-semibold mb-2'>
			{label}
		</label>
		<div className={`w-full ${height ? height : 'h-36'} rounded shadow-inner cursor-pointer
					flex flex-col items-center justify-center transition-colors
					${dragOver ? 'bg-gray-200' : 'bg-gray-100'}`}
					onClick={() => {handleClick();}}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}>
			<Content/>
		</div>
		<input
			ref={fileInputRef}
			id={id}
			accept={accept}
			className='hidden w-full rounded px-4 py-2 shadow-inner bg-gray-100'
			type='file'
			onChange={handleChange}
		/>
	</div>
}

export { InputType, ColorInput, ColorLabelInput, NumberInput, FullNumberInput, SelectInput, TextInput, FullTextInput, FullFileInput, MultiTextInput};
export type { OneInputType, InputsType, FileInputType, ColorInputType, NumberInputType, TextInputType, MultiTextInputType, SelectInputType};
