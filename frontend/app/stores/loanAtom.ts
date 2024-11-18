import { atom } from 'jotai';
import { CartProps } from './cartAtom';

// 選択された貸出情報を管理するAtom
export const selectedLoanAtom = atom<CartProps[]>([]);

// 操作する貸出履歴のvolumesを管理するAtom
export const displayLoanAtom = atom<CartProps[]>([]);
