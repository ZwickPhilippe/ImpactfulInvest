'use client';
import React, { useMemo, useCallback, useRef, useEffect, useState, RefAttributes } from 'react';
import Area from '@/components/charts/area';
import Svg from '@/components/elements/svg';
import MultiStepProgressBar from '@/components/MultiStepProgressbar/MultiStepProgressbar';
import { Button, ButtonColor, Input, InputType } from '@/components/elements';
import Radar from '@/components/charts/radar';

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
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
	const [data, setData] = useState([
		{ key: "PM10", value: 100 },
		{ key: "PM2.5", value: + 100 },
		{ key: "SO2", value: + 100 },
		{ key: "CO", value: + 100 },
		{ key: "NO2", value: + 100 },
		{ key: "AQI", value: + 100 },
		{ key: "NO2", value: + 100 },
		{ key: "AQI", value: + 100 },
	]);
  return <div className='pb-8'>
    <h1 className='text-center mb-8'>
      Your values
    </h1>
		<div
      className='w-full max-w-screen-lg cursor-pointer
          bg-white shadow transition-all
          rounded-lg mx-auto p-8'
      onClick={(e) => {
      }}>
			<div className='grid grid-cols-2 gap-4'>
				<div ref={ref} className='flex justify-center items-center w-full'>
					<div style={{height: chartWidth, width: chartWidth}}>
						<Radar data={data} width={chartWidth} height={chartWidth} />
					</div>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					{data.map((d, i) => {
						return <Input
								key={i}
								value={d.value.toString()}
								type='number'
								min={0}
								max={100}
								onChange={(e) => {
									setData((oldData) => {
										const newData = [...oldData];
										let x = 0;
										try {
											x = parseInt(e.target.value);
										} catch (e) {

										}
										if (!e.target.value ) {
											x = 0;	
										}
										newData[i] = {key: d.key, value: x};
										return newData;
									})	
								}} 
								label={d.key}
								inputType={InputType.Basic}/>
					})}
				</div>
			</div>
			<div className='flex mb-8'>
				<h3>
					What this chart tells us about you
				</h3>
				<div>

				</div>
			</div>
			<div className='flex justify-end'>
				<div className='w-24'>
					<Button className='' buttonColor={ButtonColor.Black} onClick={() => {
						window.location.href = '/list';
					}}>
						Continue
					</Button>
				</div>
			</div>
		</div>
  </div>
}
