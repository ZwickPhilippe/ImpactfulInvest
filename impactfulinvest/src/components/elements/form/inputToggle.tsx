'use client';
import { ChangeEventHandler, useId } from 'react';

export enum ToggleColor {
  Primary = 'Primiary',
  Black = 'Black',
}

export enum ToggleSize {
	XSmall = 'XSmall',
	Small = 'Small',
	Medium = 'Medium',
	Large = 'Large',
	XLarge = 'XLarge',
}

export default function Input({
	checked,
	onChange,
	color=ToggleColor.Primary,
	size=ToggleSize.Medium,
}: {
	checked: boolean,
	onChange: ChangeEventHandler<HTMLInputElement> | undefined,
	color?: ToggleColor,
	size?: ToggleSize,
}) {
	const id = useId();
	let toggleColor = 'peer-checked:bg-primary-400';
	switch (color) {
		case ToggleColor.Primary:
			toggleColor = 'peer-checked:bg-primary-400';
			break;
		case ToggleColor.Black:
			toggleColor = 'peer-checked:bg-black';
			break;
		default:
			break;
	}

	let toggleSize = 'w-12 after:w-6 after:h-6';
	switch (size) {
		case ToggleSize.XSmall:
			toggleSize = 'w-10 after:w-4 after:h-4';
			break;
		case ToggleSize.Small:
			toggleSize = 'w-8 h-5';
			break;
		case ToggleSize.Medium:
			toggleSize = 'w-12 after:w-6 after:h-6';
			break;
		case ToggleSize.Large:
			toggleSize = 'w-12 h-7';
			break;
		case ToggleSize.XLarge:
			toggleSize = 'w-14 h-8';
			break;
		default:
			break;
	}

	return <label className='inline-block relative'>
		<input type='checkbox'
				className='peer absolute left-1/2 -translate-x-1/2 cursor-pointer appearance-none rounded-md'
				onChange={onChange}
				defaultChecked={checked}/>
		<span className={`flex items-center flex-shrink-0 cursor-pointer
				rounded-full duration-300 ease-in-out
				bg-gray-300 after:bg-white ${toggleColor}
				${toggleSize} after:rounded-full after:shadow-md after:duration-300
				peer-checked:after:translate-x-4
				hover:after:translate-x-1
				p-1`}/>
	</label>;
}