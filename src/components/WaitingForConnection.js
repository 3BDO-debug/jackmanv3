import { View, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
// theme
import { Colors } from "../constants/colors";

// ------------------------------------------------------------------------------------------------

const WaitingForConnection = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="wifi-off" color={Colors.WHITE} size={50} />
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            color: Colors.WHITE,
            fontSize: 18,
            paddingVertical: 12,
          }}
        >
          No internet connection.
        </Text>
        <ActivityIndicator size={"large"} color={Colors.BUTTON} />
      </View>
    </View>
  );
};

export default WaitingForConnection;
