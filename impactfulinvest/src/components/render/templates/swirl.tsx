import { FileInputType, InputType, MultiTextInputType, NumberInputType, SelectInputType, TextInputType } from '@/components/renderInputs/input';
import { ShaderParams, shaders } from '@/render/shaders';
import { clearest, opposite } from '@/utils/color';
import { Center, FontData, Text3D } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import random from 'random';
import React, { useMemo } from 'react';
import { Font, SVGLoader } from 'three/examples/jsm/Addons.js';
import { ColorPalette, TemplateData, TemplateProps } from '.';
import { Align, AlignPositions } from '../3D/align';
import { Resize } from '../3D/resize';
import ShadertoyBackground from '../3D/shadertoy-background';
import { useSwirlFont } from '@/hooks/font';

interface Props extends TemplateProps {
  logo: ArrayBuffer;
  title: string;
  label: string;
  description: string;
  depth: number;
};

interface PresetProps extends Props {
  shapes: any[];
  logoStr: string;
};

const Preset1: React.FC<PresetProps> = ({ palette, title, label, description, shapes, logoStr, depth=0, font }) => {
  const { width, height } = useThree((state) => state.viewport);
  const fontd = useSwirlFont(font || 'montserrat').data;
  return <Center
    cacheKey={logoStr + depth + width + height + font}
    >
    <Resize max={[5,2,1]} key={logoStr} modifiy={[true,true,false]}>
        {shapes.map((shape, i) => (
          <mesh key={i} scale={[1,-1,1]}>
            <extrudeGeometry args={[shape, {depth: depth, bevelEnabled: false}]}/>
            <meshBasicMaterial
              color={palette[0]}
              />
          </mesh>
        ))}
    </Resize>
  </Center>;
};

const Preset2: React.FC<PresetProps> = ({ palette, title, label, description, shapes, logoStr, depth=0, font }) => {
  const { width, height } = useThree((state) => state.viewport);
  const fontd = useSwirlFont(font || 'montserrat').data;
   return <>
      <Align
        cacheKey={logoStr + shapes + depth + width + height + font}
        alignement={AlignPositions.LOWER_LEFT}
        margin={0.04}
        >
        <Resize max={[3,0.8,1]} key={logoStr} modifiy={[true,true,false]}>
            {shapes.map((shape, i) => (
              <mesh key={i} scale={[1,-1,1]}>
                <extrudeGeometry args={[shape, {depth: depth, bevelEnabled: false}]}/>
                <meshBasicMaterial
                  color={palette[0]}
                  />
              </mesh>
            ))}
        </Resize>
      </Align>
      <Align
        cacheKey={title + depth + width + height + font}
        alignement={AlignPositions.CENTER_LEFT}
        margin={0.04}
        >
        <Resize max={[0.75*width, 0.3*height, 1]} key={title+label} modifiy={[true,true,false]}>
            <Center top right cacheKey={font}>
              <Text3D height={depth} font={fontd} size={0.5}>
                {label}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
            <Center bottom right position={[0,-0.1,0]} cacheKey={font}>
              <Text3D height={depth} font={fontd} size={1} lineHeight={0.7}>
                {title}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
        </Resize>
      </Align>
   </>;
};

const Preset3: React.FC<PresetProps> = ({ palette, title, label, description, shapes, logoStr, depth=0, font }) => {
  const { width, height } = useThree((state) => state.viewport);
  const fontd = useSwirlFont(font || 'montserrat').data;
  return <>
      <Align
        cacheKey={logoStr + shapes + depth + width + height + font}
        alignement={AlignPositions.LOWER_LEFT}
        margin={0.04}
        >
        <Resize key={logoStr} modifiy={[true,true,false]} max={[3, 0.8, 1]}>
            {shapes.map((shape, i) => (
              <mesh key={i} scale={[1,-1,1]}>
                <extrudeGeometry args={[shape, {depth: depth, bevelEnabled: false}]}/>
                <meshBasicMaterial
                  color={palette[0]}
                  />
              </mesh>
            ))}
        </Resize>
      </Align>
      <Align
        cacheKey={title + label + depth + width + height + font}
        alignement={AlignPositions.CENTER}
        margin={0.04}
        >
        <Resize max={[0.75*width,0.33*height,1]} key={title+label} modifiy={[true,true,false]}>
            <Center top left position={[1,0.1,0]} cacheKey={font}>
              <Text3D height={depth} font={fontd} size={0.5}>
                {label}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
            <Center bottom left cacheKey={font}>
              <Text3D height={depth} font={fontd} size={1} lineHeight={0.65}>
                {title}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
        </Resize>
      </Align>
   </>;
};

const Preset4: React.FC<PresetProps> = ({ palette, title, label, description, shapes, logoStr, depth=0, font }) => {
  const { width, height } = useThree((state) => state.viewport);
  const fontd = useSwirlFont(font || 'montserrat').data;
  return <>
      <Align
        cacheKey={logoStr + shapes + depth + width + height + font}
        alignement={AlignPositions.LOWER_LEFT}
        margin={0.04}
        >
        <Resize max={[3,0.8,1]} key={logoStr} modifiy={[true,true,false]}>
            {shapes.map((shape, i) => (
              <mesh key={i} scale={[1,-1,1]}>
                <extrudeGeometry args={[shape, {depth: depth, bevelEnabled: false}]}/>
                <meshBasicMaterial
                  color={palette[0]}
                  />
              </mesh>
            ))}
        </Resize>
      </Align>
      <Align
        cacheKey={title + description + depth + width + height + font}
        alignement={AlignPositions.UPPER_LEFT}
        margin={0.04}
        >
        <Resize max={[0.75*width,0.6*height,1]} key={title+description} modifiy={[true,true,false]}>
          <group>
            <Center top right position={[0,0.4,0]} cacheKey={font}>
              <Text3D height={depth} font={fontd} size={1} lineHeight={0.7}>
                {title}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
            <Center bottom right cacheKey={font}>
              <Text3D height={depth} font={fontd} size={0.3}>
                {description}
                <meshBasicMaterial color={palette[0]} />
              </Text3D>
            </Center>
          </group>
        </Resize>
      </Align>
      <Align
        cacheKey={label + depth + width + height + font}
        alignement={AlignPositions.CENTER_RIGHT}
        margin={0.04}
        >
        {/* <Resize max={[0.8,30.5,1]} key={title+description} modifiy={[true,true,false]}> */}
        <Resize max={[Math.min(width, height)/13,height,10]} key={title+description} modifiy={[true,true,false]}>
          <Text3D height={depth} font={fontd} size={1} rotation={[0,0,3.1415/2]}>
            {label}
            <meshBasicMaterial color={palette[0]} />
          </Text3D>
        </Resize>
      </Align>
   </>;
};

const presets = [
  Preset1,
  Preset2,
  Preset3,
  Preset4,
];

type Shader = (p: ShaderParams)=>string;

// produces a component based on a shader and a depth
const Factory = (shader:Shader): [React.FC<Props>, TemplateData] => {
  let Component = (props: any) => {
    let { palette, seed, square, preset, logo, depth=0, font, onlyBackground }: Props = props;

    let R = useMemo(()=>random.clone(square + (seed || 0)), [square, seed]);
    
    const shuffle = (arr: any[]) => {
      arr = arr.slice();
      let re = [];
      while(arr.length)
        re.push(arr.splice(R.int(0, arr.length-1), 1)[0]);
      return re;
    }
    let [clear, oppos] = useMemo(()=>{
      let clear = clearest(palette)
      return [clear, opposite(clear, palette)]; 
    }, [palette]);
    let palette1 = useMemo(()=>[clear, ...shuffle(palette.filter((x:any)=>x!==clear))], [clear, square, seed]);
    let palette2 = useMemo(()=>[oppos, ...shuffle(palette.filter((x:any)=>x!==oppos))], [oppos, square, seed]);


    let frag = useMemo(() =>{
      return shader({
        palette: palette1,
        seed: square + (seed || 0),
      });
    }, [palette1, shader]);

    const logoStr = useMemo(()=>logo ? new TextDecoder().decode(logo) : '', [logo]);
    const shapes = useMemo(()=>{
      if(!logoStr) return [];
      let svg = new SVGLoader().parse(logoStr);
      return svg.paths.flatMap(SVGLoader.createShapes);
    }, [logoStr]);

    const Preset = presets[preset || 0];

    const view = useThree((state) => state.viewport);

    return (
      <>
          {
            onlyBackground ? null :
            <>
              <Preset {...props} palette={palette1} shapes={shapes} logoStr={logoStr} depth={0} key={view}/>
              {
                depth > 0 ?
                  <group position={[0,0,-depth/2-0.001]}>
                    <Preset {...props} palette={palette2} shapes={shapes} logoStr={logoStr} depth={depth}/>
                  </group>
                  : null
                }
            </>
          }
          <ShadertoyBackground fragment={frag}/>
      </>
    );
  };
  // @ts-ignore
  Component.displayName = `Swirl${shader.name}`;

  let Data: TemplateData = {
    inputs: [
      {
        type: InputType.FILE,
        label: 'Logo',
        key: 'logo',
        text: 'SVG',
        accept: 'image/svg',
        height: 'h-40',
      } as FileInputType,
      {
        type: InputType.MULTI_TEXT,
        label: 'Title',
        key: 'title',
        defaultValue: 'JOIN US',
      } as MultiTextInputType,
      {
        type: InputType.TEXT,
        label: 'Label',
        key: 'label',
        defaultValue: '#Hiring',
      } as TextInputType,
      {
        type: InputType.MULTI_TEXT,
        label: 'Description',
        key: 'description',
        defaultValue: 'We are Hiring Software \nEngineers. Apply now!',
      } as MultiTextInputType,
      {
        type: InputType.NUMBER,
        label: 'Text depth',
        key: 'depth',
        defaultValue: 0,
      } as NumberInputType,
    ],
    display_name: `${shader.name}`,
    preview_src: `/imgs/designPreviews/${shader.name}.png`,
    preset_count: presets.length,
    render: {
      orthographic: false,
      fps: 60,
      duration: 1,
    },
  };

  return [Component, Data];
};

export const templates = shaders.map(shader=>Factory(shader));