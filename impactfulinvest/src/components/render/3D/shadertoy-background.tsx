import { AnimationContext } from '@/context/AnimationContext';
import { useSwirlFrame } from '@/hooks/frame';
import { ShadertoyMaterial } from '@/render/materials/shadertoyMaterial';
import { extend, useThree } from '@react-three/fiber';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
extend({ ShadertoyMaterial });

type ShadertoyBackgroundProps = {
  fragment: string;
};

const ShadertoyBackground: React.FC<ShadertoyBackgroundProps> = ({ fragment }) => {
  const default_vert = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 ); 
    }
  `;

  const { viewport, size: fakesize } = useThree();
  const size = useMemo(() => {
    return {
      width: fakesize.width * viewport.dpr,
      height: fakesize.height * viewport.dpr,
    };
  }, [viewport, fakesize]);

  let material = useMemo(() => {
    return new ShadertoyMaterial({
      fragmentShader: fragment,
      vertexShader: default_vert,
      depthTest: false,
      depthWrite: false,
      // side: BackSide,
      uniforms: {
          iTime: { value: 0 },
          iResolution: { value: [size.width, size.height] },
      }
    });
  }, [fragment, size]);

  useEffect(()=>{
    // @ts-ignore
    material.uniforms.iResolution.value = [size.width, size.height];
  }, [size]);

  const { live } = useContext(AnimationContext);
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

export default ShadertoyBackground;
