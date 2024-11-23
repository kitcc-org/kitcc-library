import type { User } from 'client/client.schemas';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<User | undefined>(() => sessionStorage);

// ユーザ情報を管理するAtom
// 生存時間: タブが閉じられるまで
export const userAtom = atomWithStorage<User | undefined>(
	'user',
	undefined,
	storage,
);
