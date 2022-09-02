import { atom } from "recoil";

const drawerAtom = atom({
  default: { drawerStatus: "closed", drawerRef: {} },
  key: "drawer",
});

export default drawerAtom;
