import { Book } from 'client/client.schemas';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<CartProps[]>(() => sessionStorage);
export interface CartProps extends Book {
	volume: number;
}

// カートの中身を管理するAtom
// 生存時間: タブが閉じられるまで
export const cartAtom = atomWithStorage<CartProps[]>('cart', [], storage);

// 選択されたカートの本を管理するAtom
// 生存時間: ページをリロードするまで
export const selectedCartBooksAtom = atom<CartProps[]>([]);
