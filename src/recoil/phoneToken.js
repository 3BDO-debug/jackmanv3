import { atom } from "recoil";

const phoneTokenAtom = atom({
  key: "phoneToken",
  default: null,
});

export default phoneTokenAtom;
