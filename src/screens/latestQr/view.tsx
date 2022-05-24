import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import { MenuIcon, XIcon } from '../../constants/svg';
import CustomText from '../../components/customText';
import { useDrawerStatus } from '@react-navigation/drawer';
import LatestQrCard from '../../components/latestQrCard';
import { scaleHeightSize } from '../../styles/mixins';
import LogoImage from '../../components/logo';
import { AxiosContext } from "../../context/AxiosContext";
import { Colors } from '../../constants/colors';
import { useSetRecoilState } from 'recoil';
import triggeredBooking from '../../recoil/triggeredBooking';
import moment from 'moment';


// -------------------------------------------------------------------------------------------------------------


const NoRequestsCard = ({ text }) => {
  return (
    <View style={{ backgroundColor: Colors.WHITE, borderRadius: 18, paddingVertical: 25, paddingHorizontal: 50 }}>
      <Text style={{ color: Colors.BLACK, fontSize: 16, fontFamily: "Poppins-Regular", textAlign: "center" }}>{text}</Text>
    </View>
  )
}

// -------------------------------------------------------------------------------------------------------------

interface LatestQrViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const LatestQrView: FC<LatestQrViewProps> = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const [isFetching, setIsFetching] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const setTriggeredBooking = useSetRecoilState(triggeredBooking);


  const fetchBookings = useCallback(async () => {
    setIsFetching(true);
    await authAxios.get(`booking/myBookings?page=1&limit=200&orderBy=ASC`)
      .then((response) => setMyBookings(response.data.result.data))
      .catch((error) => {
        console.log("error fetching bookings", error.response.data.message);
        Alert.alert("Trouble fetching bookings");
      });
    setIsFetching(false);
  }, [])


  const { authAxios } = useContext(AxiosContext);


  useEffect(() => {
    fetchBookings();
  }, []);


  useEffect(() => {
    if (myBookings.length > 0) {

      const pendingRequestsData = [];
      const acceptedRequestsData = [];
      const rejectedRequestsData = [];


      myBookings.forEach((myBooking) => {
        if (myBooking.status === "pending") {
          pendingRequestsData.push({ name: myBooking.car.manufacturer.name, requestedDates: [myBooking.requestedDate1, myBooking.requestedDate2, myBooking.requestedDate3], time: moment(myBooking?.requestedDate1).format("hh:mm:A"), ...myBooking });
        } else if (myBooking.status === "accept") {
          acceptedRequestsData.push({ name: myBooking.car.manufacturer.name, requestedDates: [myBooking.requestedDate1, myBooking.requestedDate2, myBooking.requestedDate3], time: moment(myBooking?.requestedDate1).format("hh:mm:A"), ...myBooking });
        } else if (myBooking.status === "reject") {
          rejectedRequestsData.push({ name: myBooking.car.manufacturer.name, requestedDates: [myBooking.requestedDate1, myBooking.requestedDate2, myBooking.requestedDate3], time: moment(myBooking?.requestedDate1).format("hh:mm:A"), ...myBooking });
        }

      });

      setPendingRequests(pendingRequestsData);
      setAcceptedRequests(acceptedRequestsData);
      setRejectedRequests(rejectedRequestsData);
    }
  }, [myBookings])




  return (
    <View style={styles.container}>
      <CustomText
        text={'Latest Services'}
        size={25}
        fontFamily="bold"
        style={styles.helloText}
      />

      {isFetching ? <ActivityIndicator size="large" style={{ flex: 1 }} color={Colors.BUTTON} /> : <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
          <View style={{ paddingBottom: 10 }}>
            <CustomText text='Pending' fontFamily={"bold"} size={15} />
          </View>

          {pendingRequests.length === 0 ? <NoRequestsCard text="No Pending Requests yet" /> : <FlatList
            data={pendingRequests}
            renderItem={({ item }) => {
              return (
                <LatestQrCard
                  item={item}
                  onShowPress={() => {
                    /* navigation.navigate('QrCode'); */
                    setTriggeredBooking(item);
                    navigation.navigate('QrCode');

                  }}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />}
        </View>
        <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
          <View style={{ paddingBottom: 10 }}>
            <CustomText text='Accepted' fontFamily={"bold"} size={15} />
          </View>

          {acceptedRequests.length === 0 ? <NoRequestsCard text="No Accepted Requests yet" /> : <FlatList
            data={acceptedRequests}
            renderItem={({ item }) => {
              return (
                <LatestQrCard
                  item={item}
                  onShowPress={() => {
                    setTriggeredBooking(item);
                    navigation.navigate('QrCode');


                  }}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />}
        </View>
        <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
          <View style={{ paddingBottom: 10 }}>
            <CustomText text='Rejected' fontFamily={"bold"} size={15} />
          </View>

          {rejectedRequests.length === 0 ? <NoRequestsCard text="No Rejected Requests yet" /> : <FlatList
            data={rejectedRequests}
            renderItem={({ item }) => {
              return (
                <LatestQrCard
                  item={item}
                  onShowPress={() => {
                    setTriggeredBooking(item);
                    navigation.navigate('QrCode');


                  }}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />}
        </View>
      </View>}
    </View>
  );
};

export default LatestQrView;
