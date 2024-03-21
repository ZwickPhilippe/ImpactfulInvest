'use client';
import { MouseEventHandler, useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD, resetPasswordProps, } from '@/graphql/mutations/accounts/index';
import { FormMessage, MessageType } from '@/components/elements/form/index';
import { Button, CardOverlayContent, Input } from '@/components/elements/index';
import { errorDictToString } from '@/utils/utils';

export default function ForgotPasswordForm({
	switchToSignIn,
	close
} : {
	switchToSignIn: MouseEventHandler<HTMLButtonElement>,
	close: MouseEventHandler<HTMLButtonElement>,
}) {
	const [formMessage, setFormMessage] = useState('');
	const [formError, setFormError] = useState('');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	
	const [
		resetPassword,
		{
			loading: resetPasswordLoading,
		}] = useMutation<resetPasswordProps>(RESET_PASSWORD, {
			variables: {
				'email': email
			},
			onCompleted: (data) => {
				setFormMessage('We sent you an email with a link to reset your password.');
			},
			onError: (error) => {
				setFormError(errorDictToString('__all__', error));
				setEmailError(errorDictToString('email', error));
			}
		});

  return <>
			<h2 className='font-semibold mb-2'>
				Reset your password
			</h2>
			<p className='mb-4'>
				Enter your email address and we will send you a link to reset your password.
			</p>
			<form onSubmit={(e) => {e.preventDefault(); resetPassword();}}>
				{formError &&
					<FormMessage title='Error' messageType={MessageType.Error}>
						{formError}
					</FormMessage>
				}
				{formMessage && 
					<FormMessage messageType={MessageType.Success} title={'Check Email'}>
						{formMessage}
					</FormMessage>
				}
				<Input
					label={'Email'}
					value={email}
					error={emailError}
					placeholder={'patrickc@gmail.com'}
					onChange={(e) => setEmail(e.target.value)}
					type={'email'}
					autoFocus={true}/>
				<div className='mb-4'>
				</div>
				<Button onClick={() => {}}>
					Reset password
				</Button>
			</form>
			<p className='text-right mt-4'>
				<span className='p-1 link' onClick={switchToSignIn}>
					Sign in instead
				</span>
			</p>
		</>
}
