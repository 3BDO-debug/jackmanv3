import { atom } from "recoil";

const selectedServiceAtom = atom({
  key: "selectedService",
  default: null,
});

export default selectedServiceAtom;
