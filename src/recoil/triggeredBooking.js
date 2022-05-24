import { atom } from "recoil";

const triggeredBookingAtom = atom({
  key: "triggeredBooking",
  default: null,
});

export default triggeredBookingAtom;
