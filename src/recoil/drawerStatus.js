import { atom } from "recoil";

const drawerStatusAtom = atom({
  key: "drawerStatus",
  default: false,
});

export default drawerStatusAtom;
