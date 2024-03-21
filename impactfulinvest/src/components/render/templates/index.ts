
export type ColorPalette = Color[];
export type Color = string;

import type { InputsType } from '@/components/renderInputs/input';

export interface TemplateProps {
    palette: ColorPalette; // 🏳️‍🌈
    resolution?: number; // number from 0 to 1 -- 1 means full resolution
    seed?: number; // any number
    font?: string; // font name
    onlyBackground: boolean, // hide text if true
    square: number,
    preset: number,
};

export interface TemplateData {
    inputs: InputsType;
    preview_src: string;
    preset_count: number;
    display_name: string;
    render: {
        orthographic: boolean;
        fps: number;
        duration: number; // in seconds
    };
};

import { templates as swirl_templates } from './swirl';


export const scenes: [React.FC<any>, TemplateData][] = [
    ...swirl_templates
]