import { View } from "react-native";
import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { useRecoilState } from "recoil";
import * as Animatable from "react-native-animatable";
// atoms
import popUpAlertAtom from "../recoil/popUpAlert";

// --------------------------------------------------------------------------

const PopUpAlert = () => {
  const [popUpAlert, setPopUpAlert] = useRecoilState(popUpAlertAtom);
  const {
    visible,
    title,
    body,
    popUpActionText,
    popUpActionHandler,
    hasCustomDismissHandler,
    customDismissHandler,
  } = popUpAlert;

  const hidePopUp = () => {
    setPopUpAlert({ ...popUpAlert, visible: false });
  };

  return (
    <Portal>
      <Dialog
        dismissable={false}
        style={{ borderRadius: 18 }}
        visible={visible}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body}</Paragraph>
        </Dialog.Content>
        {visible && (
          <Dialog.Actions style={{ padding: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => {
                  if (hasCustomDismissHandler) {
                    customDismissHandler();
                  }
                  hidePopUp();
                }}
              >
                cancel
              </Button>
              <Button
                style={{ borderRadius: 18 }}
                onPress={() => {
                  popUpActionHandler();
                  hidePopUp();
                }}
                mode="contained"
              >
                {popUpActionText}
              </Button>
            </View>
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};

export default PopUpAlert;
