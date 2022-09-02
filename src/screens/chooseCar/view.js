import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, BackHandler, FlatList, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import { Arrow } from "../../constants/svg";
import CustomText from "../../components/customText";
import { scaleHeightSize } from "../../styles/mixins";
import ChooseCarCard from "../../components/chooseCarCard";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import carsAtom from "../../recoil/cars";
import bookingAtom from "../../recoil/booking";
import Screen from "../../components/Screen";
import { AndroidBackHandler } from "react-navigation-backhandler";
import selectedServiceAtom from "../../recoil/selectedService";
import { AxiosContext } from "../../context/AxiosContext";
import popUpAlertAtom from "../../recoil/popUpAlert";
import reactotron from "reactotron-react-native";

const ChooseCarView = ({ route, navigation }) => {
  const cars = useRecoilValue(carsAtom);
  const [activeCars, setActiveCars] = useState(null);

  const styles = useMemo(() => createStyles(), []);
  const [selected, setSelected] = useState(-1);
  const [booking, setBooking] = useRecoilState(bookingAtom);
  const [userBookingsData, setUserBookingsData] = useState(null);
  const selectedService = useRecoilValue(selectedServiceAtom);

  const { authAxios } = useContext(AxiosContext);

  const [popUpAlert, setPopUpAlert] = useRecoilState(popUpAlertAtom);
  const [fetching, setIsFetching] = useState(false);

  const backButtonHandler = useCallback(() => {
    if (route?.params?.editingCar === true) {
      navigation.navigate("Booking", { carDetailsEdited: true });
      return true;
    } else {
      navigation.navigate("Home");
      return true;
    }
  }, [route]);

  const userBookingsDataFetcher = useCallback(async () => {
    setIsFetching(true);
    await authAxios
      .get("/booking/myBookings")
      .then((bookingsData) =>
        setUserBookingsData(bookingsData.data.result.data)
      )
      .catch((error) => {
        console.log("Error fetching user bookings", error);
      });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, []);

  useEffect(() => {
    userBookingsDataFetcher();
  }, [userBookingsDataFetcher]);

  useEffect(() => {
    if (userBookingsData) {
      const nonActiveCars = userBookingsData.map((booking) => {
        if (booking?.status === "pending") {
          if (booking?.bookingType === selectedService?.value) {
            return booking?.car?.plateNo;
          }
        }
      });

      const activeCarsData = cars.filter(
        (car) => !nonActiveCars.includes(car?.plateNo)
      );

      setActiveCars(activeCarsData);
    }
    setIsFetching(false);
  }, [userBookingsData]);

  useEffect(() => {
    if (activeCars && activeCars?.length === 0) {
      setPopUpAlert({
        visible: true,
        title: "No active cars",
        body: `You have no active cars for the current selected service '${selectedService.title}' , either add new car or please wait until your in progress cars for the current selected service to be proceeded.`,
        popUpActionText: "Add new car",
        popUpActionHandler: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }, { name: "RegisterCar" }],
          }),
        hasCustomDismissHandler: true,
        customDismissHandler: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          }),
      });
    }
  }, [activeCars]);

  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <Screen
        navigation={navigation}
        hideFooter
        isCustomBackHandler
        customBackHandler={backButtonHandler}
      >
        <View style={styles.container}>
          <CustomText
            text={"Choose your car"}
            size={25}
            fontFamily="bold"
            style={styles.helloText}
          />

          <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
            {fetching ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={Colors.BUTTON} />
              </View>
            ) : (
              <FlatList
                data={activeCars}
                renderItem={({ item, index }) => {
                  return (
                    <ChooseCarCard
                      item={item}
                      index={index}
                      onSelected={() => {
                        setSelected(index);
                        setBooking({
                          ...booking,
                          carData: item,
                          bookingType: route?.params?.selectedService?.value,
                        });
                      }}
                      selected={selected}
                    />
                  );
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

          <CustomButton
            rightIcon={<Arrow />}
            containerStyle={[
              styles.Btn,
              { backgroundColor: selected == -1 ? Colors.GRAY : Colors.BUTTON },
            ]}
            disabled={selected == -1}
            text="CONTINUE"
            textSize={16}
            onPress={() => {
              if (route?.params?.editingCar) {
                navigation.navigate("ChooseServise", { editingCar: true });
              } else {
                navigation.navigate("ChooseServise");
              }
            }}
          />
        </View>
      </Screen>
    </AndroidBackHandler>
  );
};

export default ChooseCarView;
