import {atom} from 'recoil';

const authAtom = atom({
  key: 'auth',
  default: {
    authenticated: false,
  },
});

export default authAtom;
