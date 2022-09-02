import React, { useEffect } from "react";
import VerificationView from "./view";

const Verification = ({ route, navigation }) => {
  return (
    <>
      <VerificationView navigation={navigation} route={route} />
    </>
  );
};

export default Verification;
