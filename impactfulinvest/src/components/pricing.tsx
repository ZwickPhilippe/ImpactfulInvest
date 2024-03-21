import { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION, createCheckoutProps } from '@/graphql/payment';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';
import { Button, Skeleton, Svg } from '@/components/elements';
import useRainbow from '@/components/rainbow';
import { STRIPE_PRICES, stripePricesProps } from '@/graphql/payment/queries/stripePrices';
import { stripePrice } from '@/models/stripePrice';
import { CURRENT_SUBSCRIPTION, currentSubscriptionProps } from '@/graphql/payment/queries/currentSubscription';
import { AppContext } from '@/context/AppContext';
import { displayInt } from '@/utils/utils';
import { ButtonColor } from './elements/form/button';

enum Mode {
	ONE_TIME = 'Square',
	LANDSCAPE = 'Landscape',
}

export default function Pricing({
	buyOption
}:{
	buyOption: boolean
}) {
	const {addSnackNotification} = useContext(NotificationContext);
	const {user} = useContext(AppContext);
	const [subscriptionPackages, setSubscriptionPackges] = useState<stripePrice[]>([]);
	const [currentSubscription, setCurrentSubscription] = useState<stripePrice|undefined>();

	const skeleton : stripePrice[] = [
		{
			'priceId': 'price_1J4vFyJYbVd7Xs6Xtj5cV3Z2',
			'active': false,
			"recurring": true,
			'interval': 'month',
			'name': 'Basic',
			'title': 'Basic',
			'price': '10.00',
			'highlight': false,
			'description': '',
			'perksList': [
				'Unlimited transcription',
				'Unlimited content generation',
				'Unlimited access to comprehensive billing',
			],
			'order': 1,
		},
		{
			'priceId': 'price_1J4vFyJYbVd7Xs6Xtj5cV3Z2',
			'active': false,
			"recurring": true,
			'interval': 'month',
			'name': 'Basic',
			'title': 'Basic',
			'price': '10.00',
			'highlight': false,
			'description': '',
			'perksList': [
				'Unlimited transcription',
				'Unlimited content generation',
				'Unlimited access to comprehensive billing',
				'Unlimited content generation',
				'Unlimited access to comprehensive billing'
			],
			'order': 1,
		},
		{
			'priceId': 'price_1J4vFyJYbVd7Xs6Xtj5cV3Z2',
			'active': false,
			"recurring": true,
			'interval': 'month',
			'name': 'Basic',
			'title': 'Basic',
			'price': '10.00',
			'highlight': false,
			'description': '',
			'perksList': [
				'Unlimited transcription',
				'Unlimited content generation',
				'Unlimited access to comprehensive billing',
				'Unlimited content generation',
				'Unlimited access to comprehensive billing'
			],
			'order': 1,
		},
	]

	const {} = useQuery<stripePricesProps>(
		STRIPE_PRICES,
		{
			onCompleted: (data) => {
				const tempSubscriptionPackages: stripePrice[] = [];
				const tempOnetimePackages: stripePrice[] = [];
				console.log(data);
				data.stripePrices.forEach((price) => {
					if (price.recurring) {
						tempSubscriptionPackages.push(price);
					} else {
						tempOnetimePackages.push(price);
					}
				});
				setSubscriptionPackges(tempSubscriptionPackages);
			},
		});
	const [createCheckoutSession, {loading: createCheckoutSessionLoading}] = useMutation<createCheckoutProps>(
		CREATE_CHECKOUT_SESSION,
		{
			onCompleted: (data) => {
				window.location.href = data.createCheckoutSession.url;
			},
			onError: (error) => {
				addSnackNotification(
					'Error while checking out',
					error.message,
					SnackNotificationType.Error,
					undefined,
					undefined,
					undefined
				)
			}
		});
	const {} = useQuery<currentSubscriptionProps>(CURRENT_SUBSCRIPTION, {
		onCompleted: (data) => {
			if (data.currentSubscription) {
				setCurrentSubscription(data.currentSubscription);
			}
		},
		onError: (error) => {
			addSnackNotification(
				'Error while fetching subscription details',
				error.message,
				SnackNotificationType.Error,
				undefined,
				undefined,
				undefined
			);
		}
	});

	const handleCheckout = (priceId: string) => {
		createCheckoutSession({
				variables: {
					'priceId': priceId,
				},
		});
	}
  const transitionDelay = 250 * 1.25;
  const colors = useRainbow({intervalDelay: 250});
  const colorKeys = Object.keys(colors);
  const rainbowStyleObject = {
    ...colors,
    transition: `
      ${colorKeys[0]} ${transitionDelay}ms linear,
      ${colorKeys[1]} ${transitionDelay}ms linear,
      ${colorKeys[2]} ${transitionDelay}ms linear
    `,
    background: `
      radial-gradient(
        circle at top left,
        var(${colorKeys[2]}),
        var(${colorKeys[1]}),
        var(${colorKeys[0]})
      )
    `
  };

	const widget = (pricingPackage: stripePrice, index: number): React.ReactElement => {
		return <div key={index} className='w-full rounded-lg
				bg-white
				p-4'>
			<div className='flex justify-between items-start mb-4'>
				<h3>
					{pricingPackage.name}
				</h3>
				<div className={`${!pricingPackage.highlight && 'invisible'} border-2 border-black rounded-full text-white p-2`} style={rainbowStyleObject}>
					Best deal
				</div>
			</div>
			<div className='flex items-end
					mb-6'>
				<h2>
					US${pricingPackage.price}
				</h2>
				{pricingPackage.recurring && '/month'}
			</div>
			{	buyOption && (
					currentSubscription ? 
					<Button buttonColor={ButtonColor.Black} className={`${pricingPackage.highlight && 'text-white'} mb-10`}
							style={pricingPackage.highlight ? rainbowStyleObject : null} disabled={true}>
						{currentSubscription.priceId == pricingPackage.priceId ? 'Your current plan' : 'Other plan'}
					</Button>
					:
					<Button buttonColor={ButtonColor.Black} className={`${pricingPackage.highlight && 'text-white'} mb-10`}
							style={pricingPackage.highlight ? rainbowStyleObject : null} onClick={(e) => {
							handleCheckout(pricingPackage.priceId);	
						}}>
						Subscribe
					</Button>
				)
			}
			<div className='flex flex-col'>
				{ 
					pricingPackage.perksList.map((perk, index) => {
						return <div key={index} className='flex mb-2'>
							<Svg src='/fontawesome/svgs/light/check.svg' className='flex-shrink-0 w-4 h-4 mr-4 bg-black mt-1'/>
							{perk}
						</div>
					})
				}
			</div>
		</div>
	}

	return <div>
		<h1 className='mb-8'>
			Subscription plans
		</h1>

		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mb-8'>
			{ subscriptionPackages.length === 0 ?
				skeleton.map((price, index) => <Skeleton key={index} width='w-full' height='h-full'>
						{widget(price, index)}
					</Skeleton>
				)
				:
				subscriptionPackages.map((subscriptionPackage, index) => widget(subscriptionPackage, index))
			}
		</div>
	</div>
}
