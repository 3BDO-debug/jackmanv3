import { atom } from "recoil";

const signedWithAppleAtom = atom({
  key: "signedWithApple",
  default: false,
});

export default signedWithAppleAtom;
