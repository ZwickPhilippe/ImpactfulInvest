import React from 'react';
import { extend } from '@react-three/fiber';
import { ShaderMaterial,  } from 'three';
extend({ ShaderMaterial });

type ShaderBackgroundProps = {
  fragment: string;
  vertex?: string;
};

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ fragment, vertex }) => {
  const default_vert = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = vec4( position, 1.0 ); 
    }
  `;

  return (
    <mesh
      renderOrder={-1}
      >
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        key={fragment + vertex}
        fragmentShader={fragment}
        vertexShader={vertex || default_vert}
        depthTest={false}
      />
    </mesh>
  );
};

export default ShaderBackground;
