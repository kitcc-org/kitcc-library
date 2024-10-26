import { createJSONStorage, atomWithStorage } from "jotai/utils";
import type { User } from "orval/client.schemas";

const storage = createJSONStorage<User | undefined>(() => sessionStorage)

// ユーザ情報を管理するAtom 生存時間: セッションストレージ(タブが閉じられるまで)
export const userAtom = atomWithStorage<User | undefined>('user', undefined, storage);