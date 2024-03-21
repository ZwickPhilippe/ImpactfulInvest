

import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Align, AlignPositions } from "./align";
import { useMemo } from "react";


interface Props {
};

export const Watermark: React.FC<Props> = ({ ...props }) => {
    let { viewport } = useThree();
    let swirl = useTexture('/Swirl.so.svg');
    let aspect = useMemo(()=>swirl.image.height / swirl.image.width, [swirl.image.height, swirl.image.width]);
    let size = useMemo(()=>0.2*Math.min(viewport.width, viewport.height), [viewport.width, viewport.height]);
    return (
    <Align alignement={AlignPositions.LOWER_RIGHT} margin={0.02} cacheKey={viewport}>
        <mesh>
            <planeGeometry args={[size, size * aspect]}/>
            <meshBasicMaterial map={swirl} alphaTest={0.1} opacity={0.8} transparent/>
        </mesh>
    </Align>
    );
};
