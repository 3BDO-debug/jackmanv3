const userFullnameValidator = (userFullname) => {
  let valid;
  if (userFullname !== "") {
    if (userFullname.length >= 3 && userFullname.length <= 32) {
      valid = true;
    } else {
      valid = false;
    }
  } else {
    valid = false;
  }

  if (!/^[A-Za-z0-9]*[ ]?[A-Za-z]+[ ]?[A-Za-z0-9]*$/.test(userFullname)) {
    valid = false;
  } else {
    valid = true;
  }

  return valid;
};

export default userFullnameValidator;
