import { View } from "react-native";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
// atoms
import navigationAtom from "../recoil/navigation";
// components
import Header from "./Header";
import Footer from "./Footer";
// theme
import { Colors } from "../constants/colors";

// -------------------------------------------------------------------------------------------

const Screen = (props) => {
  const setNavigation = useSetRecoilState(navigationAtom);

  useEffect(() => {
    setNavigation(props.navigation);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <Header
        isCustomBackHandler={props.isCustomBackHandler}
        customBackHandler={props.customBackHandler}
      />
      <View style={{ flex: 1 }}>{props.children}</View>
      {!props.hideFooter && <Footer navigation={props.navigation} />}
    </View>
  );
};

export default Screen;
