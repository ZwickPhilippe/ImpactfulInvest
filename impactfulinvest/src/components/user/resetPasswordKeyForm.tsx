'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_KEY, resetPasswordKeyProps } from '@/graphql/mutations/accounts';
import { Button, Input, InputType, Svg } from '@/components/elements';
import { FormMessage, MessageType, PasswordValidator } from '@/components/elements/form';
import { errorDictToString, passwordValidator } from '@/utils/utils';
import { URL_PARAM_SHOW_SIGNIN_UP } from '@/utils/const';
import { CONTACT, HOME, USER_SETTINGS } from '@/utils/routes';
import { ButtonColor } from '../elements/form/button';

export default function ResetPasswordForm({resetKey}:{resetKey: string}) {
	const router = useRouter();

	const [formError, setFormError] = useState('');

	const [password1, setPassword1] = useState<string>('');
	const [password1Error, setPassword1Error] = useState<string>('');
	const [password1Hidden, setPassword1Hidden] = useState(true);
	const [password2, setPassword2] = useState<string>('');
	const [password2Error, setPassword2Error] = useState<string>('');
	const [password2Hidden, setPassword2Hidden] = useState(true);

	{/* Also in passwordSection.tsx, signinOrUpForm.tsx */}
	const [lengthPassed, setLengthPassed] = useState(false);
	const [captialPassed, setCapitalPassed] = useState(false);
	const [numberPassed, setNumberPassed] = useState(false);
	const [specialPassed, setSpecialPassed] = useState(false);

	const [
		resetPassword, { 
			loading: resetPasswordLoading, 
		}] = useMutation<resetPasswordKeyProps>(RESET_PASSWORD_KEY, {
			variables: {
				'key': resetKey,
				'password': password1,
			},
			onCompleted: (data) => {
				router.push(USER_SETTINGS);
			},
			onError: (error) => {
				console.log(error);
				let tempErrors = '';
				const allErrors = errorDictToString('__all__', error);
				const uidError = errorDictToString('uid', error);
				const keyError = errorDictToString('key', error);
				if (allErrors) {
					tempErrors = 'The password reset token is invalid, has expired or has already been used. \n Please reset your password again. \n If the error occurs again please';
				}
				if (keyError) {
					tempErrors += '/n' + keyError;
				}
				if (uidError) {
					tempErrors += '/n' + uidError;
				}
				setFormError(tempErrors);
				setPassword1Error(errorDictToString('password1', error));
				setPassword2Error(errorDictToString('password2', error));
				setFormError(allErrors);
			},
		});

	{/* Also in passwordSection.tsx, signinOrUpForm.tsx */}	
	const onPassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setPassword1(e.target.value);
		passwordValidator(
			password, 
			setLengthPassed,
			setCapitalPassed,
			setNumberPassed,
			setSpecialPassed);
		setPassword1Error('');
	}
	

  return <form onSubmit={(e) => {
			e.preventDefault();
			resetPassword();
			setFormError('');
		}}>

		{formError && 
			<FormMessage messageType={MessageType.Error} title={'Error'}>
				The password reset token is invalid, has expired or has already been used. 
				<br/>
				Please reset your password again <a className='link-primary' href={`${HOME}?${URL_PARAM_SHOW_SIGNIN_UP}=true`}>here.</a>
				<br/>
				If the error occurs again please <a className='link' href={CONTACT}>contact us.</a>
			</FormMessage>
		}
		<div className='relative mb-4'>
			<Input
				inputType={InputType.Basic}
				label={'Password'}
				value={password1}
				error={password1Error}
				placeholder={'*******'}
				onChange={onPassword1Change}
				type={password1Hidden ? 'password' : 'text'}
				/>
			<div className='absolute bottom-[14px] right-2'
					onClick={() => {setPassword1Hidden(!password1Hidden)}}>
				<Svg src={password1Hidden ? '/fontawesome/svgs/light/eye.svg' : '/fontawesome/svgs/light/eye-slash.svg'}
						className='w-6 h-6 cursor-pointer transition-colors
								bg-gray-400 hover:bg-black'/>
			</div>
		</div>
		<div className='relative mb-4'>
			<Input inputType={InputType.Basic}
				value={password2}
				onChange={(e) => {setPassword2(e.target.value)}}
				error={password2Error}
				placeholder={'*******'}
				type={password2Hidden ? 'password' : 'text'}
				label={'Repeat Password'}/>
			<div className='absolute bottom-[14px] right-2'
					onClick={() => {setPassword2Hidden(!password2Hidden)}}>
				<Svg src={password2Hidden ? '/fontawesome/svgs/light/eye.svg' : '/fontawesome/svgs/light/eye-slash.svg'}
						className='w-6 h-6 cursor-pointer transition-colors
								bg-gray-400 hover:bg-black'/>
			</div>
		</div>
		{/* Also in signInUpForm.tsx, signinOrUpForm.tsx */}
		<div>
			<PasswordValidator
					lengthPassed={lengthPassed}
					numberPassed={numberPassed}
					captialPassed={captialPassed}
					specialPassed={specialPassed}
					password1={password1}
					password2={password2}
					showMatchingPassword={true}/>
		</div>
		<div className='flex flex-row-reverse mt-8'>
			<Button className='max-w-xs'
					buttonColor={ButtonColor.Black}
					onClick={() => {}}
					loading={resetPasswordLoading}
					disabled={!(lengthPassed && captialPassed && numberPassed && specialPassed && password1 == password2)}>
				Reset password
			</Button>
		</div>
	</form>
}
