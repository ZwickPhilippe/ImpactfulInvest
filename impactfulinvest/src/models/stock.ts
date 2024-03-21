interface Stock {
	id: string;
	name: string;
	price: number;
	description: string;
	history: StockHistory[];
	esg: number;
	stockScore: Record<string, number>;
}

interface StockHistory {
	date: string;
	price: number;
}

interface StockScore {
	esg: number;
	water: number;
	food: number;
	energy: number;
}