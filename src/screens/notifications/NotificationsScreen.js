import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
// context
import { AxiosContext } from "../../context/AxiosContext";
// styles
import notificationsScreenStyles from "./NotificationsScreenStyles";
// theme
import { Colors } from "../../constants/colors";
// components
import NotificationCard from "../../components/NotificationCard";
import Screen from "../../components/Screen";
import ActionButton from "../../components/ActionButton";

// -----------------------------------------------------------------------------------------------------

const EmptyNotifications = ({ navigation }) => {
  return (
    <View style={notificationsScreenStyles.emptyNotificationsWrapper}>
      <Icon
        name="notifications-off-outline"
        color={Colors.PLACEHOLDER}
        size={120}
      />
      {/* Title */}
      <Text style={notificationsScreenStyles.emptyNotificationsTitle}>
        No Notifications Found
      </Text>
      {/* Body */}
      <Text style={notificationsScreenStyles.emptyNotificationsBody}>
        You have currently no notifications. We’ll notify you when something new
        arrives!
      </Text>
      {/* Action button */}
      <View style={notificationsScreenStyles.emptyNotificationsActionWrapper}>
        <ActionButton
          onPress={() => navigation.navigate("Home")}
          title="Back to home"
          icon={false}
          loading={false}
        />
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const { authAxios } = useContext(AxiosContext);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);

  const notificationsFetcher = useCallback(async () => {
    setFetchingNotifications(true);
    await authAxios
      .get("/user/auth/getNotifications")
      .then((response) => {
        setNotifications(response.data.result.data);
      })
      .catch((error) => {
        Alert.alert(
          "Server error",
          "Something wrong happened while trying to fetch notifications"
        );
        console.log("Error fetching notifications", error.response);
      });
    setFetchingNotifications(false);
  }, [authAxios]);

  useEffect(() => {
    notificationsFetcher();
  }, []);

  return (
    <Screen navigation={navigation} hideFooter>
      <View style={notificationsScreenStyles.wrapper}>
        {/* Title wrapper */}
        <View style={notificationsScreenStyles.titleWrapper}>
          <Text style={notificationsScreenStyles.title}>Notifications</Text>
        </View>
        {/* Notifications card wrapper */}
        {fetchingNotifications ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.BUTTON} />
          </View>
        ) : (
          <View style={notificationsScreenStyles.scrollWrapper}>
            {notifications.length === 0 ? (
              <EmptyNotifications navigation={navigation} />
            ) : (
              <ScrollView>
                {notifications.map((notification) => (
                  <NotificationCard
                    data={{
                      notificationDescription: notification.message,
                      dealerName: notification.booking.dealer.name,
                      dealerLogo:
                        notification?.booking?.dealer?.image ||
                        "https://res.cloudinary.com/dgif0xikd/image/upload/v1656619039/Jackman/car%20wash/Dr_Streamer_nsilio.jpg",
                    }}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
};

export default NotificationsScreen;
