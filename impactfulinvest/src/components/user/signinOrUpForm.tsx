'use client';
import { MouseEventHandler, Suspense, useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SIGNIN_OR_UP, signinOrUpProps } from '@/graphql/mutations/accounts/index';
import { 
	GOOGLE_SINGUP_URL,
	googleSignupUrlProps,
	TWITTER_SIGNUP_URL,
	twitterSignupUrlProps,
} from '@/graphql/queries/accounts/index';
import { AppContext } from '@/context/AppContext';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';
import { Button, Input, Svg, PasswordValidator, FormMessage, MessageType } from '@/components/elements';
import { URL_PARAM_NEXT } from '@/utils/const';
import { DESIGN_EDIT, USER_SETTINGS } from '@/utils/routes';
import { errorDictToString, passwordValidator } from '@/utils/utils';
import { ButtonColor } from '../elements/form/button';
import { DESIGNS, DesignsProps } from '@/graphql/design';
import {getItem, removeItem} from '@/utils/localStorage';

function SignInUpForm({
	switchToForgotPassword,
	close
} : {
	switchToForgotPassword: MouseEventHandler<HTMLButtonElement>,
	close: MouseEventHandler<HTMLButtonElement>,
}) {
	const router = useRouter();
  const searchParams = useSearchParams();
  const nextPara = searchParams.get(URL_PARAM_NEXT) as string;
	
	const {checkSignedIn} = useContext(AppContext);
	const {addSnackNotification} = useContext(NotificationContext);

	const [formMessage, setFormMessage] = useState('');
	const [formError, setFormError] = useState('');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordHidden, setPasswordHidden] = useState(true);

	{/* Also in passwordSection.tsx */}
	const [lengthPassed, setLengthPassed] = useState(false);
	const [captialPassed, setCapitalPassed] = useState(false);
	const [numberPassed, setNumberPassed] = useState(false);
	const [specialPassed, setSpecialPassed] = useState(false);

	const [redirecting, setRedirecting] = useState(false);

	const actualClose = () => {
		close(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
				clientX: 100,
				clientY: 100
			}) as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
		);
	}

	const next = () => {
		if (nextPara) {
			return nextPara;
		}
		if (typeof(window) === 'undefined' || window.location.pathname.split('?')[0] === '/' || window.location.pathname.split('?')[0] === '') {
			return USER_SETTINGS;
		}
		return window.location.pathname.split('?')[0];
	} 

	const [getDesign, {loading: getDesignLoading}] = useLazyQuery<DesignsProps>(DESIGNS, {
		onCompleted: (data) => {
			console.log(data);
			window.location.href = DESIGN_EDIT(data.designs[0].uuid);
			router.push(DESIGN_EDIT(data.designs[0].uuid));
		}
	});
	  
	const [
		signupGoogleUrl,
		{
			loading: signupGoogleUrlLoading,
		}] = useLazyQuery<googleSignupUrlProps>(GOOGLE_SINGUP_URL, {
			variables: {
				'__uriExtra': `?${URL_PARAM_NEXT}=${next()}`
			},
			onCompleted: (data) => {
				router.push(data.googleSignup);
			},
			onError: (error) => {
				addSnackNotification(
					'Error while logging in via Google',
					error.message,
					SnackNotificationType.Error,
					undefined,
					undefined,
					undefined
				)
			}
		});

	const [
		signUpTwitterUrl,
		{
			loading: signupTwitterUrlLoading,
		}] = useLazyQuery<twitterSignupUrlProps>(TWITTER_SIGNUP_URL, {
			onCompleted: (data) => {
				router.push(data.twitterSignup);
			},
			onError: (error) => {
				addSnackNotification(
					'Error while logging in via Twitter',
					error.message,
					SnackNotificationType.Error,
					undefined,
					undefined,
					undefined
				)
			}
		});
		
	const [
		signinOrUp, { 
			loading: signinOrUpLoading, 
		}] = useMutation<signinOrUpProps>(SIGNIN_OR_UP, {
			variables: {
				'email': email,
				'password': password,
			},
			onCompleted: (data) => {
				if (data.signinOrUp.verified) {
					checkSignedIn();
					console.log(nextPara);
					if (nextPara) {
						router.push(nextPara);
						actualClose();
					} else if (data.signinOrUp.redirect) {
						setRedirecting(true);
						window.location.href = data.signinOrUp.redirect
					} else {
						getDesign().then(() => {
							actualClose();
						});
						// router.push(USER_SETTINGS);
					}
				} else {
					setFormMessage(
						'An email has been sent to your email address. Please click the link in the email to verify your account.'
					);
					setFormError('');
				}
			},
			onError: (error) => {
				const allErrors = errorDictToString('__all__', error);
				if (allErrors === 'The email address and/or password you specified are not correct.') {
					setPasswordError(allErrors);
				} else {
					setFormError(allErrors);
				}
				setEmailError(errorDictToString('email', error));
			},
		});

	{/* Also in passwordSection.tsx, resetPasswordKeyForm.tsx */}	
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setPassword(password);
		passwordValidator(
			password, 
			setLengthPassed,
			setCapitalPassed,
			setNumberPassed,
			setSpecialPassed);
		setPasswordError('');
	}
	
	useEffect(() => {
		const localEmail = getItem('signupEmail');
		if (localEmail) {
			setEmail(localEmail);
			removeItem('signupEmail');
		}
	}, []);

  return <>
		<h2 className='font-semibold mb-2'>
			Welcome to Swirl
		</h2>
		<p className='mb-2'>
			If you your email is registered with us, we will log you in. Otherwise, we will create an account for you.
		</p>
		{formMessage && 
			<FormMessage messageType={MessageType.Success} title={'Verify Email'}>
				{formMessage}
			</FormMessage>
		}
		{formError && 
			<FormMessage messageType={MessageType.Error} title={'Error'}>
				{formError}
			</FormMessage>
		}
		<form onSubmit={(e) => {
				e.preventDefault();
				signinOrUp();
				setFormError('');
				setFormMessage('');
			}}>
			<div className='mb-4'>
				<Input
					label={'Email'}
					value={email}
					error={emailError}
					placeholder={'patrickc@gmail.com'}
					onChange={(e) => {setEmail(e.target.value); setEmailError('');}}
					type={'email'}
					autoFocus={true}
				/>
			</div>
			<div className='mb-4'>
				<div className='relative'>
					<Input
						label={'Password'}
						value={password}
						error={passwordError}
						placeholder={'*******'}
						onChange={onPasswordChange}
						type={passwordHidden ? 'password' : 'text'}
						/>
					<div className='absolute absolute-y-center right-2'
							onClick={() => {setPasswordHidden(!passwordHidden)}}>
						<Svg src={passwordHidden ? '/fontawesome/svgs/light/eye.svg' : '/fontawesome/svgs/light/eye-slash.svg'}
								className='w-6 h-6 cursor-pointer transition-colors
										bg-gray-400 hover:bg-black'/>
					</div>
				</div>
				<div className='flex justify-end'>
					<span className='text-sm link mt-2' onClick={switchToForgotPassword} tabIndex={0}>
						Forgot your password?
					</span>
				</div>
				{/* Also in passwordSection.tsx */}
				<div>
					<PasswordValidator
							lengthPassed={lengthPassed}
							numberPassed={numberPassed}
							captialPassed={captialPassed}
							specialPassed={specialPassed}
							password1={password}
							password2={password}
							showMatchingPassword={false}/>
				</div>
			</div>
			<Button buttonColor={ButtonColor.Black}
					disabled={!(lengthPassed && captialPassed && numberPassed && specialPassed)} 
					loading={signinOrUpLoading || redirecting}>
				Continue
			</Button>
		</form>
		<div className='relative flex justify-center w-full
				my-2'>
			<div className='w-16 text-center z-10
					bg-white
					p-2 '>
				or
			</div>
			<div className='absolute h-0.5 w-full inset-y-1/2 -translate-y-1/2 z-0
					bg-gray-500'>
			</div>
		</div>
		<div>
			<Button className='group' buttonColor={ButtonColor.Black}
					onClick={() => {signupGoogleUrl()}} loading={signupGoogleUrlLoading}>
				<Svg className='absolute inset-y-1/2 -translate-y-1/2 left-2 w-4 h-4 transition-colors
							bg-white group-hover:bg-primary-400'
						src='/fontawesome/svgs/brands/google.svg'/>
				Continue with Google
			</Button>
			<div className='mb-4'/>
			<Button className='group' buttonColor={ButtonColor.Black}
					onClick={() => {signUpTwitterUrl()}} loading={signupTwitterUrlLoading}>
				<Svg className='absolute inset-y-1/2 -translate-y-1/2 left-2 w-4 h-4 transition-colors
							bg-white group-hover:bg-primary-400'
						src='/fontawesome/svgs/brands/twitter.svg'/>
				Continue with X
			</Button>
		</div>
	</>
}




export default function SignInUpFormWrapper({
	switchToForgotPassword,
	close
} : {
	switchToForgotPassword: MouseEventHandler<HTMLButtonElement>,
	close: MouseEventHandler<HTMLButtonElement>,
}) {
  return <Suspense>
    <SignInUpForm switchToForgotPassword={switchToForgotPassword} close={close}/>
  </Suspense>
}