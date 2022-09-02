const phoneNumberValidator = (phoneNumber) => {
  let valid;
  const phoneStartingSchema = phoneNumber.toString().slice(0, 2);
  if (phoneStartingSchema === "+2") {
    /* +20 validation +201017003476 */
    const validationExp = phoneNumber.toString().slice(0, 3);
    if (validationExp === "+20" && phoneNumber.length === 13) {
      valid = true;
    } else {
      valid = false;
    }
  } else if (phoneStartingSchema === "00") {
    /* 0020 validation */
    const validationExp = phoneNumber.toString().slice(0, 4);
    if (validationExp === "0020" && phoneNumber.length === 14) {
      valid = true;
    } else {
      valid = false;
    }
  } else if (phoneStartingSchema === "01") {
    /* 01 */
    const validationExp = phoneNumber.toString().slice(0, 2);
    if (validationExp === "01" && phoneNumber.length === 11) {
      valid = true;
    } else {
      valid = false;
    }
  } else {
    valid = false;
  }
  return valid;
};

export default phoneNumberValidator;
