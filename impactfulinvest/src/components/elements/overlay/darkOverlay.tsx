'use client';

export default function DarkOverlay({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='fixed inset-0 z-20
		bg-black bg-opacity-80'>
		<div className='relative w-full h-full overflow-y-auto max-h-full m-auto'>
			{children}
		</div>
	</div>
}
