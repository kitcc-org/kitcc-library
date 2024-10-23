import { atom } from "jotai";
import { createJSONStorage, atomWithStorage } from "jotai/utils";

const storage = createJSONStorage<CartProps[]>(() => sessionStorage);
export interface CartProps {
  id: number
  stock: number
}

export const cartAtom = atomWithStorage<CartProps[]>('cart', [], storage);

export const selectedBooksAtom = atom<CartProps[]>([]);