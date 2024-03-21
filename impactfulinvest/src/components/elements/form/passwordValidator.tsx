export default function PasswordValidator({
	lengthPassed,
	captialPassed,
	numberPassed,
	specialPassed,
	password1,
	password2,
	showMatchingPassword
}:{
	lengthPassed: boolean,
	captialPassed: boolean,
	numberPassed: boolean,
	specialPassed: boolean,
	password1: string,
	password2: string,
	showMatchingPassword: boolean
	}) {
	return <div>
		<p className={`text-sm mb-0 ${lengthPassed ? 'text-success' : 'text-error'}`}>
			Your password must contain at least 8 characters
		</p>
		<p className={`text-sm mb-0 ${captialPassed ? 'text-success' : 'text-error'}`}>
			Your password must contain a captial letter
		</p>
		<p className={`text-sm mb-0 ${numberPassed ? 'text-success' : 'text-error'}`}>
			Your password must contain a number
		</p>
		<p className={`text-sm mb-0 ${specialPassed ? 'text-success' : 'text-error'}`}>
			Your password must contain a special character
		</p>
		{showMatchingPassword &&
			<p className={`text-sm mb-0 ${password1 == password2 ? 'text-success' : 'text-error'}`}>
				Your passwords must match
			</p>
		}
	</div>
}