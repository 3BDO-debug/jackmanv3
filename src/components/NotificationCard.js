import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const NotificationCard = ({ data }) => {
  const { notificationDescription, dealerName, dealerLogo } = data;
  const [isShowMore, triggerShowMore] = useState(false);

  const handleShowMore = () => {
    triggerShowMore(!isShowMore);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Avatar wrapper */}
        <View style={styles.avatarWrapper}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 99,
            }}
            source={{ uri: dealerLogo }}
          />
        </View>
        {/* Details wrapper */}
        <View style={styles.descriptionContainer}>
          {/* Title wrapper */}
          <View style={styles.titleWrapper}>
            {/* Title */}
            <Text style={styles.title}>{dealerName}</Text>
            {/* Title action */}
            <TouchableOpacity
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
              }}
              onPress={handleShowMore}
            >
              <Text style={styles.titleActionText}>
                {isShowMore ? "Show less" : " Show more"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Body */}
          <Text numberOfLines={isShowMore ? 12 : 2} style={styles.bodyText}>
            {notificationDescription}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    borderRadius: 18,
    marginBottom: "20@s",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "30@s",
  },
  avatarWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 100,
    height: 100,
    paddingVertical: "18@s",
  },
  descriptionContainer: {
    flexDirection: "column",
    paddingVertical: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: "14@s",
    color: Colors.BLACK,
    textAlign: "left",
    width: "90@s",
  },
  titleActionText: {
    color: Colors.BUTTON,
    fontFamily: "Poppins-Regular",
    fontSize: "10@s",
  },
  bodyText: {
    fontFamily: "Poppins-Regular",
    fontSize: "12@s",
    color: Colors.BUTTON,
    width: 190,
    marginTop: 5,
  },
});

export default NotificationCard;
