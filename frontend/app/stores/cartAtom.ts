import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { SelectedBookProps } from './bookAtom';
import { atom } from 'jotai';

const storage = createJSONStorage<CartProps[]>(() => sessionStorage);
export interface CartProps extends SelectedBookProps {
	volume: number;
}

// カートの中身を管理するAtom
// 生存時間: セッションストレージ(タブが閉じられるまで)
export const cartAtom = atomWithStorage<CartProps[]>('cart', [], storage);

// 選択されたカートの本を管理するAtom
// 生存時間: DOM(ページをリロードするまで)
export const selectedCartBooksAtom = atom<CartProps[]>([]);
