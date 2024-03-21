'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { googleCallbackProps, twitterCallbackProps } from '@/graphql/queries/accounts/index';
import { URL_PARAM_SHOW_SIGNIN_UP } from '@/utils/const';
import { DESIGN_EDIT, HOME, SOCIAL_SIGNUP, SOCIAL_SIGNUP_ERROR, USER_SETTINGS } from '@/utils/routes';
import { DESIGNS, DesignsProps } from '@/graphql/design';
import { setItem } from '@/utils/localStorage';

function SocialCallback({
	query,
}:{
	query: DocumentNode
}) {
	const router = useRouter();
  const searchParams = useSearchParams();
	const [getDesign, {loading: getDesignLoading}] = useLazyQuery<DesignsProps>(DESIGNS, {
		onCompleted: (data) => {
			console.log(data);
			router.push(DESIGN_EDIT(data.designs[0].uuid));
		}
	});
	useQuery<googleCallbackProps|twitterCallbackProps>(
		query,
		{
			variables: { '__uriExtra': '?' + searchParams.toString() },
			onCompleted: (data) => {
				let actualData = null
				if ('googleSignupCallback' in data) {
					actualData = data.googleSignupCallback;
				} else {
					actualData = data.twitterSignupCallback;
				}
				if (actualData.email) {
					router.push(SOCIAL_SIGNUP);
					setItem('signupEmail', actualData.email)
				} else {
					if (actualData.redirect) {
						router.push(actualData.redirect);
					} else {
						getDesign();
						// router.push(USER_SETTINGS);
					}
				}
			},
			onError: (error) => {
				console.log(error)
				if (error.message === 'Social Network Login Failure') {
					console.log('Something went wrong. Please try login in again or contact our support.');
					router.push(SOCIAL_SIGNUP_ERROR);
				} else {
					console.log(error.message);
				}
			}
		});

	useEffect(() => {
		if (searchParams.get('error') === 'access_denied') {
			router.push(`${HOME}?${URL_PARAM_SHOW_SIGNIN_UP}=true`);
		}
	}, []);

  return <>
		<h1>
			Redirecting
		</h1>
		<p>
			Please hold on while we redirect you ...
		</p>
		<img className='aspect-1-1 w-full animate-pulse' src='/imgs/redirect.webp' alt='redirect'/>
	</>
}


export default function PageWrapper({query,}:{query: DocumentNode}) {
  return <Suspense>
    <SocialCallback query={query}/>
  </Suspense>
}