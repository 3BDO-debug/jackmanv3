import { atom } from "recoil";

const userLocationAtom = atom({
  key: "userLocation",
  default: null,
});

export default userLocationAtom;
