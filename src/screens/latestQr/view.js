import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import { MenuIcon, XIcon } from "../../constants/svg";
import CustomText from "../../components/customText";
import { useDrawerStatus } from "@react-navigation/drawer";
import LatestQrCard from "../../components/latestQrCard";
import { scaleHeightSize } from "../../styles/mixins";
import LogoImage from "../../components/logo";
import { AxiosContext } from "../../context/AxiosContext";
import { Colors } from "../../constants/colors";
import { useRecoilState, useSetRecoilState } from "recoil";
import triggeredBooking from "../../recoil/triggeredBooking";
import moment from "moment";
import services from "../../mocks/serviceData";
import ServiceCard from "../../components/ServiceCard";
import selectedServiceAtom from "../../recoil/selectedService";

// -------------------------------------------------------------------------------------------------------------

const NoRequestsCard = ({ text }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 18,
        paddingVertical: 25,
        paddingHorizontal: 50,
      }}
    >
      <Text
        style={{
          color: Colors.BLACK,
          fontSize: 16,
          fontFamily: "Poppins-Regular",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

// -------------------------------------------------------------------------------------------------------------

const LatestQrView = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const [isFetching, setIsFetching] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const setTriggeredBooking = useSetRecoilState(triggeredBooking);
  const [selectedService, setSelectedService] =
    useRecoilState(selectedServiceAtom);

  const fetchBookings = useCallback(async () => {
    setIsFetching(true);
    await authAxios
      .get(`booking/myBookings?page=1&limit=200&orderBy=ASC`)
      .then((response) => setMyBookings(response.data.result.data))
      .catch((error) => {
        console.log("error fetching bookings", error.response.data.message);
        Alert.alert("Trouble fetching bookings");
      });
    setIsFetching(false);
  }, []);

  const onServicePressHandler = useCallback(
    (serviceId) => {
      if (selectedService && selectedService.id === serviceId) {
        setSelectedService(null);
      } else {
        const selectedServiceData = services.find(
          (service) => service.id === serviceId
        );
        setSelectedService(selectedServiceData);
      }
    },
    [selectedService, services]
  );

  const { authAxios } = useContext(AxiosContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (myBookings.length > 0) {
      const pendingRequestsData = [];
      const acceptedRequestsData = [];
      const rejectedRequestsData = [];

      const bookingsData = selectedService
        ? myBookings.filter(
            (booking) => booking.bookingType === selectedService.value
          )
        : myBookings;

      bookingsData.forEach((myBooking) => {
        if (myBooking.status === "pending") {
          pendingRequestsData.push({
            name: myBooking?.car?.manufacturer?.name,
            requestedDates: [
              myBooking.requestedDate1,
              myBooking.requestedDate2,
              myBooking.requestedDate3,
            ],
            time: moment(myBooking?.requestedDate1)
              .add(-2, "hours")
              .format("hh:mm:A"),
            ...myBooking,
          });
        } else if (myBooking.status === "approved") {
          acceptedRequestsData.push({
            name: myBooking?.car?.manufacturer?.name,
            requestedDates: [
              myBooking.requestedDate1,
              myBooking.requestedDate2,
              myBooking.requestedDate3,
            ],
            time: moment(myBooking?.requestedDate1)
              .add(-2, "hours")
              .format("hh:mm:A"),
            ...myBooking,
          });
        } else if (myBooking.status === "rejected") {
          rejectedRequestsData.push({
            name: myBooking?.car?.manufacturer?.name,
            requestedDates: [
              myBooking.requestedDate1,
              myBooking.requestedDate2,
              myBooking.requestedDate3,
            ],
            time: moment(myBooking?.requestedDate1)
              .add(-2, "hours")
              .format("hh:mm:A"),
            ...myBooking,
          });
        }
      });

      setPendingRequests(pendingRequestsData);
      setAcceptedRequests(acceptedRequestsData);
      setRejectedRequests(rejectedRequestsData);
    }
  }, [myBookings, selectedService]);

  return (
    <ScrollView style={styles.container}>
      <CustomText
        text={"Latest Services"}
        size={25}
        fontFamily="bold"
        style={styles.helloText}
      />

      {/* Filter services */}

      <View style={styles.filterByServiceWrapper}>
        <Text style={styles.filterByServiceTitle}>Filter by service: </Text>
        <Text style={styles.filterByServiceValue}>
          {selectedService ? selectedService.title : "No service"}
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          style={{ paddingBottom: 20 }}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 25,
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              cardData={{ ...service }}
              pressHandler={onServicePressHandler}
              selectedService={selectedService}
            />
          ))}
        </ScrollView>
      </View>

      {isFetching ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1 }}
          color={Colors.BUTTON}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
            <View style={{ paddingBottom: 10 }}>
              <CustomText text="Pending" fontFamily={"bold"} size={15} />
            </View>

            {pendingRequests.length === 0 ? (
              <NoRequestsCard text="No Pending Requests yet" />
            ) : (
              <FlatList
                data={pendingRequests}
                renderItem={({ item }) => {
                  return (
                    <LatestQrCard
                      item={item}
                      onShowPress={() => {
                        setTriggeredBooking(item);
                        navigation.navigate("QrCode");
                      }}
                    />
                  );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
          <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
            <View style={{ paddingBottom: 10 }}>
              <CustomText text="Accepted" fontFamily={"bold"} size={15} />
            </View>

            {acceptedRequests.length === 0 ? (
              <NoRequestsCard text="No Accepted Requests yet" />
            ) : (
              <FlatList
                data={acceptedRequests}
                renderItem={({ item }) => {
                  return (
                    <LatestQrCard
                      item={item}
                      onShowPress={() => {
                        setTriggeredBooking(item);
                        navigation.navigate("QrCode");
                      }}
                    />
                  );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
          <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
            <View style={{ paddingBottom: 10 }}>
              <CustomText text="Rejected" fontFamily={"bold"} size={15} />
            </View>

            {rejectedRequests.length === 0 ? (
              <NoRequestsCard text="No Rejected Requests yet" />
            ) : (
              <FlatList
                data={rejectedRequests}
                renderItem={({ item }) => {
                  return (
                    <LatestQrCard
                      item={item}
                      onShowPress={() => {
                        setTriggeredBooking(item);
                        navigation.navigate("QrCode");
                      }}
                    />
                  );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default LatestQrView;
