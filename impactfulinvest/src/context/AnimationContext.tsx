'use client';
import { FrameData } from '@/hooks/frame';
import { useFrame } from '@react-three/fiber';
import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useRef } from 'react';


type AnimationType = {
	live: boolean;
    useFrame: (func: (d: FrameData)=>void)=>()=>void;
    getFrame: ()=>number;
    getTime: ()=>number;
    nextFrame: ()=>void;
    isDone: ()=>boolean;
    reset: (frame0?: number)=>void;
    setFps: (f: number)=>void;
    setDuration: (f: number)=>void;
}

interface AnimationProps {
  children: ReactNode;
  live: boolean; // run in preview live or in render more
}

export const AnimationContext = createContext<AnimationType>({live:true} as AnimationType);

const AnimationProvider: React.FC<AnimationProps> = ({ children, live }) => {
    let frameRef = useRef(0); // yes, we dont want state here, we want to keep it as fast as possible
    let useframes = useRef<{[id: number]: ((d: FrameData)=>void); }>({});
    let fps = useRef(0);
    let duration = useRef(0);

    const getFrame = useMemo(()=>{
        return ()=>frameRef.current;
    }, []);
    
    const getTime = useMemo(()=>{
        return ()=>getFrame()/fps.current;
    }, [getFrame, live]);

    const nextFrame = useMemo(()=>{
        return ()=>{
            frameRef.current++;
            for(let id in useframes.current){
                useframes.current[id]({time: getTime()});
            }
        };
    }, [getTime]);
    
    const isDone = useMemo(()=>{
        return ()=>frameRef.current >= fps.current * duration.current;
    }, [fps, duration]);

    const reset = useMemo(()=>{
        return (frame?: number)=>{
            frameRef.current = frame || 0;
        };
    }, []);

    const useFrameFunc = useMemo(()=>{
        return (func: (d: FrameData)=>void)=>{
            const id = Date.now()*100 + Math.random() + 10*Math.random();
            useframes.current[id] = func;
            return ()=>{
                delete useframes.current[id];
            };
        };
    }, []);

    const setFps = (f: number)=>{
        fps.current = f;
    };
    const setDuration = (f: number)=>{
        duration.current = f;
    };

	return (
		<AnimationContext.Provider value={{live, getFrame, getTime, nextFrame, isDone, useFrame: useFrameFunc, reset, setFps, setDuration}}>
			{children}
		</AnimationContext.Provider>
	);
};

export default AnimationProvider;