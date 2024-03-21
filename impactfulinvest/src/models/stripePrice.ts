interface stripePrice {
	priceId: string;
	active: boolean;
	recurring: boolean;
	interval: string;
	name: string;
	title: string;
	description: string;
	perksList: string[];
	highlight: boolean;
	price: string;
	order: number;
}
export type { stripePrice };