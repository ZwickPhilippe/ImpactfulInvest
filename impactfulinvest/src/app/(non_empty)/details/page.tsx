'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

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
	const [description, setDescription] = useState('');
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setChartWidth(ref.current.offsetWidth);
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
		let x = {'portfolio': stocks.map(stock => stock.name)};
		fetch('http://127.0.0.1:5000/api/portfolio-summary', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(x),
		}).then(res => res.text()).then(data => {
			console.log(data);
			setDescription(data);
		});
  }, []);

  return <div className={`max-w-screen-xl w-full mx-auto`}>
		<div className='grid grid-cols-2 gap-8 mb-8'>
			<div className='bg-white shadow rounded-lg p-8 '>
				<h2>
					Your portfolio
				</h2>
				<h2 className='font-semibold'>
					$14.28
				</h2>
				<h4 className='text-green-500 font-semibold'>
					+2.3%(+0.32)
				</h4>
				<div ref={ref}>
					<Area stock={appleStock} width={chartWidth} height={300}/>
				</div>
			</div>

			<div className='bg-white shadow rounded-lg p-8'>
				<h2 className='font-semibold mb-4'>
					Distribution of underlying assets
				</h2>
				<Worldmap width={chartWidth - 140} height={200}/>
			</div>
		</div>

		<div className='grid grid-cols-3 gap-8 mb-8'>
			<div className='bg-white shadow rounded-lg p-8'>
				<div className='flex flex-row items-center mb-4'>
					<h3 className='font-semibold'>
						ESG Rating
					</h3>
					<div className='rounded-full bg-green-500 text-white px-4 py-1 ml-2'>
						{Math.trunc(stocks.reduce((sum, stock) => sum + stock.esg, 0) / stocks.length * 10000) / 10000}
					</div>
				</div>
				<div className='grid grid-cols-3 gap-4 mb-6'>
					{
						Object.entries(stocks[0].stockScore).map(([key, score]) => (
							<div className='flex flex-row justify-between items-center text-sm' key={key}>
								{key}
								<div className='rounded-full bg-green-500 text-white px-4 py-1 ml-2'>
									{Math.trunc(stocks.reduce((sum, stock) => sum + stock.stockScore[key], 0) / stocks.length * 10000) / 10000}
								</div>
							</div>
						))
					}
				</div>
			</div>
			<div className='bg-white shadow rounded-lg p-8 col-span-2'>
				<h3 className='font-semibold'>
					Description
				</h3>
				<div>
					{description}
				</div>
			</div>
		</div>
		
		<div className='bg-white shadow rounded-lg p-8'>
			<h3 className='font-semibold mb-2'>
				News
			</h3>
			<div className='grid grid-cols-3 gap-8'>
				<div className='rounded-lg'>
					<img src='/l1.png' className='rounded-lg aspect-[2/1] object-cover mb-2'/>
					<h4 className='font-semibold text-sm'>
						Global Shift: Major Banks Pledge to Greener Investments
					</h4>
					<div className='text-sm'>
						This article discusses a new initiative by several of the world's largest banks to significantly increase their funding of green projects and decrease investments in fossil fuel-related industries, aiming to align their portfolios more closely with global climate goals.
					</div>
				</div>			

				<div className='rounded-lg'>
					<img src='/l2.png' className='rounded-lg aspect-[2/1] object-cover mb-2'/>
					<h4 className='font-semibold text-sm'>
						Innovative ESG ETF Launches to Target Clean Energy and Social Equity
					</h4>
					<div className='text-sm'>
					The launch of a new Exchange-Traded Fund (ETF) focused on investing in companies that excel in clean energy production and promote social equity, offering investors a chance to contribute positively to environmental and social issues through their investments.
					</div>
				</div>	

				<div className='rounded-lg'>
					<img src='/l3.png' className='rounded-lg aspect-[2/1] object-cover mb-2'/>
					<h4 className='font-semibold text-sm'>
						Corporate Governance Reforms: A New Dawn for Responsible Investing
					</h4>
					<div className='text-sm'>
						This piece explores recent reforms in corporate governance aimed at enhancing transparency and accountability. These reforms are designed to encourage companies to adopt more sustainable and responsible business practices, signaling a positive development for investors concerned with ESG factors.
					</div>
				</div>	
			</div>				
			
		</div>
	</div>
}

