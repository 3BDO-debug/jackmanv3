import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { Feather, AntDesign } from "@expo/vector-icons";
//
import { Colors } from "../constants/colors";

const ActionButton = ({
  title,
  icon,
  iconComponent,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <Button
      mode="contained"
      style={styles.buttonWrapper}
      onPress={onPress}
      contentStyle={{
        height: 48,
        flexDirection: "row-reverse",
      }}
      icon={() => icon && iconComponent}
      disabled={disabled}
      loading={loading}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Button>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 18,
    width: "100%",
  },

  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: Colors.WHITE,
    textAlignVertical: "center",
  },
});
