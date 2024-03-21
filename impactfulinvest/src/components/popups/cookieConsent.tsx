import Link from 'next/link';
import { Button } from '@/components/elements';
import { COOKIES } from '@/utils/routes';
import { showCookieConsent, setAnalytics, setMarketing,} from '@/utils/cookies';

export default function CookieConsent() {
	if (!showCookieConsent()) return undefined;
	return <div className='absolute left-0 right-0 bottom-0 border-t
			bg-white border-gray-300 shadow
			p-4'>
		<h3 className='mb-2'>
			Cookies
		</h3>
		<div className='flex flex-col md:flex-row'>
			<div className='shrink text-sm mb-2 md:mb-0'>
				By keep using our site you agree to the storing of cookies on your device to enhance site navigation,
				analyze site usage, and assist in our marketing efforts. Read more here: <Link href={COOKIES} className='link-primary'>Cookie policy</Link>
			</div>
			<div className='flex items-center justify-center break-keep'>
				<div className='flex items-center'>
					<div className='w-32 text-center text-sm break-keep mx-4'
						onClick={() => {
							setAnalytics(false);
							setMarketing(false);
						}}>
						Allow necessary
					</div>
					<div className='w-48'>
						<Button className='text-sm break-keep' onClick={() => {
								setAnalytics(true);
								setMarketing(true);
							}}>
								Accept all cookies
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
}