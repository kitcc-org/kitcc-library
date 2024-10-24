import { createJSONStorage, atomWithStorage } from "jotai/utils";
import type { User } from "orval/client.schemas";

const storage = createJSONStorage<User>(() => sessionStorage)
export const noUser: User = {
  id: -1,
  email: '',
  name: '',
  sessionToken: ''
}

// ユーザ情報を管理するAtom 生存時間: セッションストレージ(タブが閉じられるまで)
export const userAtom = atomWithStorage<User>('user', noUser, storage);