'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { user } from '@/models/user'
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';


type AppContextType = {
	signedIn: boolean;
	user: user | undefined;

}

interface AppProviderProps {
  children: ReactNode;
}


export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const {addSnackNotification} = useContext(NotificationContext);

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<user|undefined>();



	// useEffect(() => {
	// 	checkSignedIn();
	// }, []);

	// useEffect(() => {
	// 	if (signedIn) {
	// 		getUser();
	// 	}
	// }, [signedIn]);

	return (
		<AppContext.Provider value={{signedIn, user}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;