import {getItem, setItem} from '@/utils/localStorage';

interface Design {
	uuid: string;
	name: string;
	thumbnail: string;
	data?: string;
	updatedAt?: string;
}

export function saveDesign(design: Design): void {
  setItem(design.uuid, JSON.stringify(design));
}
export function loadDesign(uuid: string): Design | null  {
	const temp = getItem(uuid);
	return temp ? JSON.parse(temp as string) : null;
}

export type { Design };