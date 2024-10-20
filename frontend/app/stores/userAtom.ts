import { createJSONStorage, atomWithStorage } from "jotai/utils";
import type { User } from "orval/client.schemas";

const storage = createJSONStorage(() => sessionStorage)
export const noUser: User = {
  id: -1,
  email: '',
  name: '',
  sessionToken: ''
}

export const userAtom = atomWithStorage('user', noUser, storage);