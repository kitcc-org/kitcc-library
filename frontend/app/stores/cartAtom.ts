import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<CartProps[]>(() => sessionStorage);
export interface CartProps {
	id: number;
	stock: number;
}

// カートの中身を管理するAtom
// 生存時間: セッションストレージ(タブが閉じられるまで)
export const cartAtom = atomWithStorage<CartProps[]>('cart', [], storage);

// 選択された本を管理するAtom
// 生存時間: DOM(ページをリロードするまで)
export const selectedBooksAtom = atom<CartProps[]>([]);
