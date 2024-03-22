'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, ButtonColor, ButtonShape, ButtonSize, Input, InputType, Svg } from '@/components/elements';
import Radar from '@/components/charts/radar';
import { Tab } from '@/components/elements/tab';
import { STOCKS, dataToStockFake } from '@/utils/const';
import Area from '@/components/charts/area';
import {AppContext} from '@/context/AppContext';
import { Stock } from '@/models/stock';
import Link from 'next/link';

enum Mode {
	ALL = 'All',
	YOUR_PREFERENCES = 'Your preferences',
}

export default function Page() {
	const {stocks, addStock, removeStock} = useContext(AppContext);

  const ref = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState(Mode.YOUR_PREFERENCES);
  const [chartWidth, setChartWidth] = useState(600);

	const [stockRecs, setStockRecs] = useState<Stock[]>([]);


	async function fetchData() {
		const res = await fetch('http://127.0.0.1:5000/api/recommendation')
		const resJ = await res.json();
		const temp = resJ.map((data: any) => {
			return dataToStockFake(data);
		})
		setStockRecs(temp);
	}
	
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setChartWidth(ref.current.offsetWidth);
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

		fetchData();
  }, []);

	if (stockRecs.length === 0) {
		return;
	}

  return <div className='max-w-screen-lg pb-8 mx-auto'>
		<div className='flex justify-between'>
			<h1 className='semibold mb-4'>
				Stocks which could be interesting to you
			</h1>
			<div className='w-40'>
				<Link href='/details'>
					<Button disabled={stocks.length === 0}
							buttonColor={ButtonColor.Black}
							buttonShape={ButtonShape.Round}
							buttonSize={ButtonSize.Small}>
						Your portfolio ({stocks.length})
					</Button>
				</Link>
			</div>
		</div>
		<div className='flex items-center mb-8 mx-auto'>
			<Tab element={mode} elements={Object.values(Mode)} setElement={setMode}/>
		</div>
		<div
      className='w-full cursor-pointer
          bg-white shadow transition-all
          rounded-lg mx-auto p-8'>
			<div>
				<table className='table-auto w-full'>
					<thead>
						<tr className='py-2'>
							<th className='text-left'>#</th>
							<th className='text-left'>Name</th>
							<th className='text-left'>Issuer</th>
							<th className='text-left'>ESG Score</th>
							<th className='text-left'>Water</th>
							<th className='text-left'>Biodiv</th>
							<th className='text-left'>Env</th>
							<th className='text-left'>Fossil</th>
							<th className='text-left'>Chart</th>
							<th className='text-left'>Add</th>
						</tr>
					</thead>
					<tbody>
						{stockRecs.map((stock, i) => {
							return <tr className='py-2 h-[40px]' key={i}>
								<td>
									{i}
								</td>
								<td>
									{stock.name}
								</td>
								<td>
									{stock.issuer}
								</td>
								<td>
									{stock.esg}
								</td>
								<td>
									{stock.stockScore['Water']}
								</td>
								<td>
									{stock.stockScore['Biodiv']}
								</td>
								<td>
									{stock.stockScore['Env']}
								</td>
								<td>
									{stock.stockScore['Fossil']}
								</td>
								<td className='h-[32px]'>
									<Area stock={stock.history} width={40} height={28}/>
								</td>
								<td className='w-[20px]'>
									{stocks.find(s => s.id === stock.id) ?
										<Button buttonSize={ButtonSize.Small} buttonColor={ButtonColor.Black}
												onClick={() => {
													removeStock(stock);
												}}>
											<Svg className='w-3 h-3 bg-white' src='/fontawesome/svgs/light/minus.svg'/>
										</Button>
										:
										<Button buttonSize={ButtonSize.Small} buttonColor={ButtonColor.Black}
												onClick={() => {
													addStock(stock);
												}}>
											<Svg className='w-3 h-3 bg-white' src='/fontawesome/svgs/light/plus.svg'/>
										</Button>
									}
								</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		</div>
  </div>
}
