'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';
import { font } from '@/models/font';
import { InputsType } from '@/components/renderInputs/input';
import { useLazyQuery } from '@apollo/client';
import { BRANDS, BrandsProps } from '@/graphql/brand/queries/brands';
import { BRAND, BrandProps } from '@/graphql/brand/queries/brand';
import { Brand } from '@/models/brand';
import { AppContext } from './AppContext';

type CanvaObject = {
	inputs: InputsType;
	setInputs: React.Dispatch<React.SetStateAction<InputsType>>;
}

type ColorContextType = {
	brand: Brand | null;
	font: font;
	setFont: React.Dispatch<React.SetStateAction<font>>;
	canvaObject: CanvaObject|undefined;
	setCanvaObject: React.Dispatch<React.SetStateAction<CanvaObject|undefined>>;
}

interface ColorProviderProps {
	children: ReactNode;
}

export const ColorContext = createContext<ColorContextType>({} as ColorContextType);


const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
	const { addSnackNotification } = useContext(NotificationContext);
	const { signedIn } = useContext(AppContext);
	const [canvaObject, setCanvaObject] = useState<CanvaObject|undefined>(undefined);
	const [brand, setBrand] = useState<Brand | null>(null);
  const [font, setFont] = useState<font>({
		name: 'Montserrat',
		thickness: 400,
		css: `font-montserrat`
	});
	const [getBrands, {}] = useLazyQuery<BrandsProps>(BRANDS, {
		onCompleted: (data) => {
			getBrand({
				variables: {
					uuid: data.brands[0].uuid
				}
			})
		},
		onError: (error) => {
			addSnackNotification(
				'Error while logging in via Twitter',
				error.message,
				SnackNotificationType.Error,
				undefined,
				undefined,
				undefined
			)
		}
	});
 	const [getBrand, {}] = useLazyQuery<BrandProps>(BRAND, {
		onCompleted: (data) => {
			setBrand(data.brand);
		},
		onError: (error) => {
			addSnackNotification(
				'Error while logging in via Twitter',
				error.message,
				SnackNotificationType.Error,
				undefined,
				undefined,
				undefined
			)
		}
	});

	useEffect(() => {
		if (signedIn) {
			getBrands();
		}
	}, [signedIn]);
	// useEffect(() => {
	// 	checkSignedIn();
	// }, []);

	return (
		<ColorContext.Provider value={{
			brand,
			canvaObject, setCanvaObject,
			font, setFont}}>
			{children}
		</ColorContext.Provider>
	);
};

export default ColorProvider;