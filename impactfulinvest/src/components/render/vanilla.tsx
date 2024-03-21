"use client";

import React, { useCallback, useEffect, useMemo, useRef } from 'react';

interface Props {
    resolution?: number;
    draw?: (canvas: HTMLCanvasElement, context: any, time: number) => void;
    onresize?: () => void;
}

/**
 * Basic canvas component for drawing on a canvas element.
 */
const Vanilla: React.FC<Props> = ({ resolution, draw, onresize }) => {
    let canRef = useRef<HTMLCanvasElement>(null);

    let m_onresize = useCallback(() => {
        if(!canRef.current) return;
        let res = resolution || 1;
        let can = canRef.current;
        can.width = can.offsetWidth * res;
        can.height = can.offsetHeight * res;

        onresize?.();
    }, [canRef, resolution, onresize]);

    useEffect(() => {
        let can = canRef.current;
        let ctx = can?.getContext('2d');
        let active = true;
        const loop = () => {
            if(!active) return;
            if(can && ctx){
                draw?.(can, ctx, Date.now());
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
        return () => { active = false; };
    }, [draw, canRef]);

    useEffect(() => {
        m_onresize();
        window.addEventListener('resize', m_onresize);
        return () => window.removeEventListener('resize', m_onresize);
    }, [m_onresize]);

    return <canvas ref={canRef} className='w-full h-full'/>
};

export default Vanilla;
