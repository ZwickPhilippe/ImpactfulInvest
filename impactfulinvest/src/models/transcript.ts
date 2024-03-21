interface transcript {
	id: string;
	youtube: string;
	title: string;
	text: string;
	error: string;
	generatedTitles: title[];
	descriptions: description[];
	twitterPosts: twitterPost[];
	blogs: blog[];
	quotes: quote[];
	titlesInputTokens: number;
	descriptionsInputTokens: number;
	quotesInputTokens: number;
	twitterInputTokens: number;
	blogInputTokens: number;
}
interface title {
	text: string;
}
interface description {
	text: string;
}
interface twitterPost {
	text: string;
}
interface blog {
	text: string;
}
interface quote {
	text: string;
}

export type { transcript };