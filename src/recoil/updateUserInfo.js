import { atom } from "recoil";

const updateUserInfoAtom = atom({
  key: "updateUserInfo",
  default: 0,
});

export default updateUserInfoAtom;
