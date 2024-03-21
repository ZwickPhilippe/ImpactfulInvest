'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, ButtonColor, ButtonShape, ButtonSize, Input, InputType, Svg } from '@/components/elements';
import Radar from '@/components/charts/radar';
import { Tab } from '@/components/elements/tab';
import { STOCKS } from '@/utils/const';
import Area from '@/components/charts/area';
import {AppContext} from '@/context/AppContext';

enum Mode {
	ALL = 'All',
	YOUR_PREFERENCES = 'Your preferences',
}

export default function Page() {
	const {stocks, addStock, removeStock} = useContext(AppContext);

  const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState(Mode.YOUR_PREFERENCES);
  const [chartWidth, setChartWidth] = useState(600);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setChartWidth(ref.current.offsetWidth);
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
  }, []);

  return <div ref={ref}
	className={`max-w-screen-md w-full cursor-pointer
			bg-white shadow hover:drop-shadow-glow transition-all
			rounded-lg mx-auto`}>
			<div className='p-8'>
			<h2>
				{stock.name}
			</h2>
			<h2 className='font-semibold'>
				$14
			</h2>
			<h4 className='text-green-500 font-semibold'>
				+2.3%(+0.32)
			</h4>
			</div>
			<Area width={chartWidth} height={300}/>
			<div className='p-8'>
			<div className='flex flex-row items-center mb-4'>
				<h3 className='font-semibold'>
					ESG Rating
				</h3>
				<div className='rounded-full bg-green-500 text-white px-4 py-1 ml-2'>
					{stock.esg}
				</div>
			</div>
			<div className='grid grid-cols-3 gap-4 mb-6'>
				{
					Object.entries(stock.stockScore).map(([key, score]) => (
						<div className='flex flex-row items-center text-sm' key={key}>
							{key}
							<div className='rounded-full bg-green-500 text-white px-4 py-1 ml-2'>
								{score}
							</div>
						</div>
					))
				}
			</div>
			<div className='mb-8'>
				{stock.description}
			</div>
			<div className='group flex justify-end items-center text-gray-400 hover:text-black'
					onClick={(e) => {
						e.stopPropagation();
					}}>
				More details
				<Svg className='w-4 h-3 bg-gray-400 group-hover:bg-black ml-2 transition-all'
						src='/fontawesome/svgs/light/arrow-right.svg' />
			</div>
		</div>
	</div>
}

