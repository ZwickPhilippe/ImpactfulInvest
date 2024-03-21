import { Center, CenterProps } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";


export enum AlignPositions{
    CENTER,
    UPPER_RIGHT,
    UPPER_LEFT,
    LOWER_RIGHT,
    LOWER_LEFT,
    CENTER_RIGHT,
    CENTER_LEFT,
    CENTER_TOP,
    CENTER_BOTTOM,
};

export const Values = Object.values(AlignPositions).map(x=>x.toString());
export const Options = Values.map((x, index)=><div key={index}>{x.toLowerCase().replace('_', ' ')}</div>);

interface AlignProps extends CenterProps{
    children: JSX.Element[] | JSX.Element;
    alignement?: AlignPositions,
    margin?: number,
};

export const Align: React.FC<AlignProps> = ({alignement = AlignPositions.CENTER, margin = 0.02, children, ...props})=>{
    let { width, height } = useThree((state) => state.viewport);
    let left = [AlignPositions.LOWER_LEFT, AlignPositions.UPPER_LEFT, AlignPositions.CENTER_LEFT].includes(alignement);
    let right = [AlignPositions.LOWER_RIGHT, AlignPositions.UPPER_RIGHT, AlignPositions.CENTER_RIGHT].includes(alignement);
    let top = [AlignPositions.UPPER_LEFT, AlignPositions.UPPER_RIGHT, AlignPositions.CENTER_TOP].includes(alignement);
    let bottom = [AlignPositions.LOWER_LEFT, AlignPositions.LOWER_RIGHT, AlignPositions.CENTER_BOTTOM].includes(alignement);
    let marg = useMemo(()=>margin*(width+height)/2, [margin, width, height]);

    return <Center
        cacheKey={width + height + alignement + margin} 
        left={right} right={left} top={bottom} bottom={top}
        position={[right ? width*0.5-marg : (left ? -width*0.5+marg : 0), top ? height*0.5-marg : (bottom ? -height*0.5+marg : 0), 0]}
        {...props} 
        >
        {children}
    </Center>
};

export default { Align, Values, Options, AlignPositions };