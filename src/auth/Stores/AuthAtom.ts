
import { atom } from 'recoil';
import type { LoginType } from '../Stores/Types';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// Login state atom with persistence, including role
export const loginState = atom<LoginType>({
    key: 'loginState',
    default: {
        logged: false,
        token: '',   
        message: '',
        userData: {
            id: 0,
            user_name: ''
        },
    },
    effects_UNSTABLE: [persistAtom],
});
