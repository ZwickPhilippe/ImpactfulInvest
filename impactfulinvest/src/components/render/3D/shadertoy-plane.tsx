import { useSwirlFrame } from '@/hooks/frame';
import { ShadertoyMaterial } from '@/render/materials/shadertoyMaterial';
import { extend, useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
extend({ ShadertoyMaterial });

type ShadertoyPlaneProps = {
  fragment: string;
};

const ShadertoyPlane: React.FC<ShadertoyPlaneProps> = ({ fragment }) => {
  const { size } = useThree();
  let material = new ShadertoyMaterial({
    fragmentShader: fragment,
    uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [size.width, size.height] },
    }
  });

  useEffect(()=>{
    material.uniforms.iResolution.value = [size.width, size.height];
  }, [size]);

  useSwirlFrame(({time})=>{
    material.uniforms.iTime.value = time;
  });

  return (
    <mesh
      renderOrder={-1}
      material={material}
      >
      <planeGeometry args={[2, 2, 1, 1]} />
    </mesh>
  );
};

export default ShadertoyPlane;
