'use client';

export function Tab({ 
		element,
		elements,
		setElement,
  }: {
		element: string,
    elements: string[],
		setElement: (element: any) => void
  }) {
	return <>
		{Object.values(elements).map((el, index) => {
			return <div key={index} className={`cursor-pointer p-2 transition-all
				${index === 0 ? 'rounded-l-full pl-4' : ''}
				${index === elements.length - 1 ? 'rounded-r-full pr-4' : ''}
				${element === el ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}
				`}
				onClick={() => setElement(el)}>
				{el}
			</div>
		})}
	</>
}