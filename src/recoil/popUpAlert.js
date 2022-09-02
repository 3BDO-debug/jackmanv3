import { atom } from "recoil";

const popUpAlertAtom = atom({
  key: "popUpAlert",
  default: {
    visible: false,
    title: "Hello test alert",
    body: "this a dummy test alert",
    popUpActionText: "",
    popUpActionHandler: null,
    hasCustomDismissHandler: false,
    customDismissHandler: null,
  },
});

export default popUpAlertAtom;
