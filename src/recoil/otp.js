import { atom } from "recoil";

const otpAtom = atom({
  key: "otp",
  default: null,
});

export default otpAtom;
