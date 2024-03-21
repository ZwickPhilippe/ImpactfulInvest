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
import { Recorder } from '@/render/export/recorder';


type RecorderContextType = {
	recorderRef: React.MutableRefObject<any>;
}

interface ColorProviderProps {
	children: ReactNode;
}

export const RecorderContext = createContext<RecorderContextType>({} as RecorderContextType);


const RecorderProvider: React.FC<ColorProviderProps> = ({ children }) => {
	const recorderRef = React.useRef<any>(null);

	return (<>
        <Recorder ref={recorderRef}/>
		<RecorderContext.Provider value={{
            recorderRef
        }}>
			{children}
		</RecorderContext.Provider>
    </>);
};

export default RecorderProvider;