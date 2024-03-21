'use client';
import React, { useMemo, useCallback, useRef, useEffect, useState, RefAttributes } from 'react';
import { Button, ButtonColor, ButtonSize, Input, InputType, Svg } from '@/components/elements';
import Radar from '@/components/charts/radar';
import { Tab } from '@/components/elements/tab';
import { STOCKS } from '@/utils/const';
import Area from '@/components/charts/area';

enum Mode {
	ALL = 'All',
	YOUR_PREFERENCES = 'Your preferences',
}

export default function Page() {
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

  return <div className='pb-8'>
		<div className='flex items-center mb-2'>
			<Tab element={mode} elements={Object.values(Mode)} setElement={setMode}/>
		</div>
		<div
      className='w-full max-w-screen-lg cursor-pointer
          bg-white shadow transition-all
          rounded-lg mx-auto p-8'>
			<div>
				<table className='table-auto w-full'>
					<thead>
						<tr>
							<th className='text-left'>#</th>
							<th className='text-left'>Name</th>
							<th className='text-left'>Issuer</th>
							<th className='text-left'>ESG Score</th>
							<th className='text-left'>Water</th>
							<th className='text-left'>Food</th>
							<th className='text-left'>Energy</th>
							<th className='text-left'>Chart</th>
							<th className='text-left'>Add</th>
						</tr>
					</thead>
					<tbody>
						{STOCKS.map((stock, i) => {
							return <tr key={i}>
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
									{stock.stockScore['Energy']}
								</td>
								<td>
									{stock.stockScore['Food']}
								</td>
								<td>
									<Area width={40} height={20}/>
								</td>
								<td>
									<Button buttonSize={ButtonSize.Small}>
										<Svg className='w-4 h-4' src='/fontawesome/svgs/light/plus.svg'/>
									</Button>
								</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		</div>
  </div>
}
