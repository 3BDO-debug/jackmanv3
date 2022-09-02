import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import CustomText from "../customText";

const AlertModal = ({ closeHandler, isTriggered, alertText }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isTriggered}
      onRequestClose={closeHandler}
      onDismiss={closeHandler}
    >
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          {/* Title */}
          <View style={styles.alertTitleWrapper}>
            <Text style={styles.alertTitle}>Alert</Text>
            <View style={styles.titleDivider} />
          </View>
          <Text style={styles.alertText}>{alertText}</Text>
          {/* Action button */}
          <Pressable style={styles.actionButton} onPress={closeHandler}>
            <CustomText color="white" size={12} text="Okay!" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  alertTitleWrapper: {
    marginBottom: 10,
  },
  alertTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  titleDivider: {
    backgroundColor: Colors.WHITE_GRAY,
    width: "100%",
    height: 1,
    borderRadius: 18,
    marginTop: 10,
  },
  alertText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    width: 200,
    color: Colors.BLACK,
  },
  actionButton: {
    backgroundColor: Colors.BUTTON,
    borderRadius: 18,
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: "auto",
  },
});
