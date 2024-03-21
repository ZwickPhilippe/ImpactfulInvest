'use client';
import React, { useMemo, useCallback, useRef, useEffect, useState, RefAttributes } from 'react';
import Area from '@/components/charts/area';
import Svg from '@/components/elements/svg';
import MultiStepProgressBar from '@/components/MultiStepProgressbar/MultiStepProgressbar';
import { Button, ButtonColor } from '@/components/elements';
import { STOCKS } from '@/utils/const';

function Card(stocks: any[], pickStock: any, page: number, stock: Stock) {
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


  return <div ref={ref}
      className={`max-w-screen-md w-full cursor-pointer
          bg-white shadow ${stocks.some(item => item && item.id === stock.id) && 'drop-shadow-glow'} hover:drop-shadow-glow transition-all
          rounded-lg mx-auto`}
      onClick={(e) => {
        pickStock(page, stock);
      }}>
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

export default function Home() {
  const [page, setPage] = useState(0);
  const [compStock, setStock] = useState([null, null]);
  const [yourStocks, setYourStocks] = useState([null, null, null, null, null]);

  function pickStock(p: number, stock: Stock) {
    setYourStocks((yourStock: any) => {
      const newList = [...yourStock];
      newList[p] = stock;
      return newList;
    });
    setPage((oldPage: number) => {
      if (oldPage === (STOCKS.length / 2) - 1) {
        return oldPage;
      }
      return oldPage + 1
    });
  }

  async function getSuggestions() {
    const res = await fetch('http://127.0.0.1:5000/api/compare-suggestion');
    const recs = await res.json();

    const res2 = await fetch(`http://127.0.0.1:5000/api/esg-data?isin=${recs[0]}`);
    const stock1 = await res2.json();
    console.log(stock1);

    const res3 = await fetch(`http://127.0.0.1:5000/api/esg-data?isin=${recs[1]}`);
    const stock2 = await res3.json();
    console.log(stock2);

    const openai0 = await fetch(`http://127.0.0.1:5000/api/openAI?isin=${recs[0]}`);
    console.log(openai0);

    const openai1 = await fetch(`http://127.0.0.1:5000/api/openAI?isin=${recs[1]}`);
    console.log(openai1);

    setStock([stock1, stock2]);
  }

  useEffect(() => {
    getSuggestions();
  }, []);
  if (!compStock[0]) {
    return <div>
      Loading
    </div>
  }

  return <div className='pb-8'>
    <h1 className='text-center mb-8'>
      Pick your prefered stock
    </h1>
    <div className='flex justify-center items-center'>
      <h3 className='unselectable text-gray-500'>
        {page + 1} / {STOCKS.length / 2}
      </h3>
    </div>
    <div className='grid grid-cols-2 gap-8 mt-8 mb-8'>
      {Card(yourStocks, pickStock, page, STOCKS[2 * page])}
      {Card(yourStocks, pickStock, page, STOCKS[2 * page + 1])}
    </div>
    
    {!yourStocks.includes(null) && 
      <Button buttonColor={ButtonColor.Black} onClick={(e) => {
        e.stopPropagation();
        window.location.href = '/your-diagram';
      }}>
        Submit
      </Button>
    }
  </div>
}
