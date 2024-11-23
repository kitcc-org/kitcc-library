import { atom } from 'jotai';

export interface SelectedBookProps {
	id: number;
	title: string;
	stock: number;
	thumbnail?: string;
}

// 選択された本を管理するAtom
// 生存時間: ページをリロードするまで
export const selectedBooksAtom = atom<SelectedBookProps[]>([]);
