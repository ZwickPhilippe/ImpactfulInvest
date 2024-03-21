interface user {
	firstName: string,
	lastName: string,
	emailaddressSet: emailaddress[],
	socialaccountSet: socialaccount[],
	hasUsablePassword: boolean,
	monthlyTokens: number,
	oneTimeTokens: number

	brandUuid: string,
	designUuid: string,
}

interface emailaddress {
	email: string,
	primary: boolean,
	verified: boolean,
}

interface socialaccount {
	uid: string,
	provider: string,
	email: string,
}

export type { user, emailaddress, socialaccount};