import {atom} from 'recoil';

const carsAtom = atom({
  key: 'cars',
  default: [],
});

export default carsAtom;
