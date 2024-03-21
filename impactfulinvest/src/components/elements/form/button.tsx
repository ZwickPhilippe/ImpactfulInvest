'use client';
import { MouseEventHandler } from 'react';

export enum ButtonColor {
  Black = 'Black',
  Gray = 'Gray',
  White = 'White',
  BlackOutline = 'BlackOutline',
  GrayOutline = 'GrayOutline',

  Primary = 'Primiary',
  Secondary = 'Secondary',
  Tetritary = 'Tetritary',
  Quaternary = 'Quaternary',
  PrimaryOutline = 'PrimaryOutline',
  SecondaryOutline = 'SecondaryOutline',
  TetritaryOutline = 'TetritaryOutline',
  QuaternaryOutline = 'QuaternaryOutline',

  Good = 'Good',
  Neutral = 'Neutral',
  Bad = 'Bad',
  GoodOutline = 'GoodOutline',
  NeutralOutline = 'NeutralOutline',
  BadOutline = 'BadOutline',
}

export enum ButtonShape {
  Square = 'Square',
  Round = 'Round',
}

export enum ButtonSize {
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}

export default function Button(
  { 
    children,
    onClick,
    buttonColor=ButtonColor.Primary,
    buttonShape=ButtonShape.Square,
    buttonSize=ButtonSize.Medium,
    loading=false,
    disabled=false,
    className='',
    width='',
    height='',
    style={},
  }: {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonColor?: ButtonColor,
    buttonShape?: ButtonShape,
    buttonSize?: ButtonSize,
    loading?: boolean,
    disabled?: boolean,
    className?: string,
    width?: string,
    height?: string,
    style?: React.CSSProperties,
  }
) {
  let btnColorClass = 'button-primary';
  let loadingColor = 'bg-black';
  switch (buttonColor) {
    case(ButtonColor.Black):
      btnColorClass = 'bg-black enabled:hover:bg-gray-600 text-white disabled:opacity-50';
      loadingColor = 'bg-white';
      break;
    case(ButtonColor.Gray):
      btnColorClass = 'bg-gray-500 text-white';
      break;
    case(ButtonColor.White):
      btnColorClass = 'bg-white text-black';
      break;
    case(ButtonColor.BlackOutline):
      btnColorClass = 'bg-white text-black border-black';
      break;
    case(ButtonColor.GrayOutline):
      btnColorClass = 'bg-white text-gray-500 border-gray-500';
      break;

    case(ButtonColor.Primary):
      btnColorClass = `bg-primary-400 text-text-primary-400 enabled:hover:bg-primary-700 enabled:hover:text-text-primary-700
        border border-solid border-primary-400 
        disabled:opacity-50`;
      break;
    case(ButtonColor.PrimaryOutline):
      btnColorClass = ` bg-white hover:bg-primary-400 text-primary-400 hover:text-white
        border border-solid border-primary-400
        disabled:opacity-50`;
      break;
    case(ButtonColor.Secondary):
      btnColorClass = `bg-secondary-500 text-text-secondary-500 
        border border-solid border-secondary-500 
        disabled:opacity-50`;
      break;
    
    case(ButtonColor.Bad):
      btnColorClass = `text-white bg-red-500 hover:bg-red-800
        disabled:bg-red-600 disabled:opacity-50`;
      break;
  }
  let btnShapeClass = 'rounded-lg';
  switch (buttonShape) {
    case(ButtonShape.Square):
      btnShapeClass = 'rounded-lg';
      break;
    case(ButtonShape.Round):
      btnShapeClass = 'rounded-full';
      break;
  }
  let btnSizeClass = 'button-md';
  switch (buttonSize) {
    case(ButtonSize.XSmall):
      btnSizeClass = 'px-2 py-1 text-xs';
      break;
    case(ButtonSize.Small):
      btnSizeClass = 'button-sm';
      break;
    case(ButtonSize.Medium):
      btnSizeClass = 'button-md';
      break;
    case(ButtonSize.Large):
      btnSizeClass = 'button-lg';
      break;
    case(ButtonSize.XLarge):
      btnSizeClass = 'button-xl';
      break;
  }

  return <button className={`flex items-center justify-center cursor-pointer disabled:cursor-default transition-all
      hover:animate-scale
      relative ${width ? width : 'w-full'} ${height ? height : 'h-auto'} 
        ${btnColorClass} ${btnSizeClass} ${btnShapeClass} ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
      style={style}>
    { loading ? 
      <div className='flex items-center justify-center space-x-2'>
        <p className='invisible mb-0'>X</p>
        <div className={`one w-2 h-2 ${loadingColor} rounded-full`}></div>
        <div className={`two w-2 h-2 ${loadingColor} rounded-full`}></div>
        <div className={`three w-2 h-2 ${loadingColor} rounded-full`}></div>
        <p className='invisible mb-0'>X</p>
      </div>
      :
      children
    }
  </button>
}
