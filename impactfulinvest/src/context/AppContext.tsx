'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';


type AppContextType = {
	stocks: Stock[]
	addStock: (stock: Stock) => void;
	removeStock: (stock: Stock) => void;

}

interface AppProviderProps {
  children: ReactNode;
}


export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const {addSnackNotification} = useContext(NotificationContext);

  const [stocks, setStocks] = useState<Stock[]>([]);

	const addStock = (stock: Stock) => {
		setStocks([...stocks, stock]);
	}

	const removeStock = (stock: Stock) => {
		setStocks(stocks.filter(s => s.id !== stock.id));
	}

	return (
		<AppContext.Provider value={{stocks, addStock, removeStock}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;