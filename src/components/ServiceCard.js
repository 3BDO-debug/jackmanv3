import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// theme
import { Colors } from "../constants/colors";

const ServiceCard = ({ pressHandler, cardData, selectedService }) => {
  const { title, iconName, id } = cardData;

  const renderIconColor = () => {
    let color;
    if (selectedService) {
      if (id === selectedService.id) {
        color = Colors.WHITE;
      } else {
        color = Colors.BUTTON;
      }
    } else {
      color = Colors.BUTTON;
    }
    return color;
  };

  const renderBackgroundColor = () => {
    let color;
    if (selectedService) {
      if (id === selectedService.id) {
        color = Colors.BUTTON;
      } else {
        color = Colors.WHITE;
      }
    } else {
      color = Colors.WHITE;
    }
    return color;
  };

  return (
    /* Wrapper */
    <View style={styles.wrapper}>
      {/* Icon container */}
      <TouchableOpacity onPress={() => pressHandler(id)}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: renderBackgroundColor(),
            },
          ]}
        >
          <Icon name={iconName} size={35} color={renderIconColor()} />
        </View>
      </TouchableOpacity>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 30,
    width: 70,
  },
  iconContainer: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins-Medium",
    color: Colors.WHITE,
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
});
