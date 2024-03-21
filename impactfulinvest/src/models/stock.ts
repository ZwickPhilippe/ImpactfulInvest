import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

export interface Stock {
	id: string;
	name: string;
	issuer: string;
	price: number;
	description: string;
	history: AppleStock[];
	esg: number;
	stockScore: Record<string, number>;
}

interface StockScore {
	esg: number;
	water: number;
	food: number;
	energy: number;
}