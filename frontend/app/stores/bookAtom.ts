import { Book } from 'client/client.schemas';
import { atom } from 'jotai';

// 選択された本を管理するAtom
// 生存時間: ページをリロードするまで
export const selectedBooksAtom = atom<Book[]>([]);
