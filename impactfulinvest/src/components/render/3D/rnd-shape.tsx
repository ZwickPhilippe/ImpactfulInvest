import { Cone, Dodecahedron, RoundedBox, Sphere, TorusKnot } from "@react-three/drei";
import random from "random";


interface Props {
    seed: number;
    props: any;
    children: any;
};

export const RndShape: React.FC<Props> = ({ seed, children, ...props }) => {

    let R = random.clone(seed);

    const shapes: [any, any][] = [
        [RoundedBox, { radius: 0.15 }],
        [Sphere, { args: [0.5, 32, 32] }],
        [Cone, { args: [0.5, 1, 7], }],
        [TorusKnot, { args: [0.35, 0.15, 100, 16 ] }],
        [Dodecahedron, { args: [0.5, 0]}]
        
    ];
    const index = R.int(0, shapes.length - 1);
    const [Shape, shapeProps] = shapes[index];

    return (
        <Shape
            {...props}
            {...shapeProps}
        >
            {children}
        </Shape>
    );
};
