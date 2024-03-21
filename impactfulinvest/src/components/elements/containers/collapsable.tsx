'use client';
import { useState } from 'react';
import { Svg } from'@/components/elements';


export default function Collapsable({
	title,
	icon,
	children,
	className,
	start
}: {
	title: string,
	icon?: string,
	children: React.ReactNode,
	className?: string,
	start?: boolean,
}) {
	const [open, setOpen] = useState(start !== undefined ? start : false);
  // const [measureRef, { height }] = useMeasure();

  // const styles = useSpring({
  //   config: { duration: 150 },
  //   from: {
  //     height: 0
  //   },
  //   to: {
  //     height: open ? height : 0
  //   }
  // });
  return <div className={`${className}`}>
		<div className='w-full cursor-pointer font-semibold unselectable'
				onClick={() => {setOpen(!open)}}>
			<div className='w-full flex justify-between items-center pb-1'>
				<div className='flex items-center'>
					{ icon && <Svg
							className='h-5 w-5 mr-2
									bg-black'
							src={icon}/>
					}
					<h3 className='text-black'>
						{title}
					</h3>
				</div>
				{<Svg
						className={`h-3 w-3 transition-transform
								bg-black ${open ? 'transform rotate-180' : ''}`}
						src='/fontawesome/svgs/regular/chevron-down.svg'/>
				}
			</div>
		</div>
		{/* <animated.div className='mt-1' style={{ overflow: 'hidden', ...styles }}> */}
			{open && <div
					// ref={measureRef}
					className='mt-2'
					>
				{children}
				</div>
			}
		{/* </animated.div> */}
	</div>
}
