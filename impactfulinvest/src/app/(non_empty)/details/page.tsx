'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, ButtonColor, ButtonShape, ButtonSize, Input, InputType, Svg } from '@/components/elements';
import Radar from '@/components/charts/radar';
import { Tab } from '@/components/elements/tab';
import { STOCKS } from '@/utils/const';
import Area from '@/components/charts/area';
import {AppContext} from '@/context/AppContext';
import Worldmap from '@/components/charts/worldmap';

enum Mode {
	ALL = 'All',
	YOUR_PREFERENCES = 'Your preferences',
}

export default function Page() {
	const {stocks, addStock, removeStock} = useContext(AppContext);

  const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState(Mode.YOUR_PREFERENCES);
  const [chartWidth, setChartWidth] = useState(600);
	const stock = STOCKS[0];
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

  return <div
			className={`max-w-screen-xl w-full cursor-pointer
			bg-white shadow transition-all
			rounded-lg p-8 mx-auto`}>
		<h2>
			{stock.name}
		</h2>
		<h2 className='font-semibold'>
			$14
		</h2>
		<h4 className='text-green-500 font-semibold'>
			+2.3%(+0.32)
		</h4>
		<div className='grid grid-cols-2 gap-8'>
			<div ref={ref}>
				<Area width={chartWidth} height={300}/>
			</div>
			<div>
				<Worldmap width={chartWidth} height={300}/>
			</div>
			<div>
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
			</div>
			<div className='mb-8'>
				{stock.description}
			</div>
		</div>
		<div>
			<h3 className='font-semibold'>
				News
			</h3>
			<div>

			</div>
		</div>
	</div>
}

