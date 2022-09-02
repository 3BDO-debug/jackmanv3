import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Animatable from "react-native-animatable";
import { FlatList, View, Alert, ScrollView, Text } from "react-native";
import createStyles from "./styles";
import { Arrow } from "../../constants/svg";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import TextBtn from "../../components/textBtn";
import CarCard from "../../components/carCard";
import Animated from "react-native-reanimated";
import { useRecoilState, useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth";
import carsAtom from "../../recoil/cars";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
import ServiceCard from "../../components/ServiceCard";
import { Colors } from "../../constants/colors";
import selectedServiceAtom from "../../recoil/selectedService";
import services from "../../mocks/serviceData";
import signedWithAppleAtom from "../../recoil/signedWithApple";
import { useSetRecoilState } from "recoil";
import popUpAlertAtom from "../../recoil/popUpAlert";
import { Button } from "react-native-paper";
import TutorialVideo from "../../components/TutorialVideo";

const HomeView = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const [cars, setCars] = useRecoilState(carsAtom);

  const userData = useRecoilValue(authAtom)?.userData;

  const styles = useMemo(() => createStyles(), []);

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const [canBook, setCanBook] = useState(false);
  const [selectedService, setSelectedService] =
    useRecoilState(selectedServiceAtom);

  const isSignedWithApple = useRecoilValue(signedWithAppleAtom);

  const checkReservationAvailabilty = useCallback(async () => {
    await authAxios
      .get("/user/auth/canReserve")
      .then((response) => {
        if (response.data.message) {
          setCanBook(true);
        } else {
          setCanBook(false);
        }
      })
      .catch((error) => console.log("error", error.response));
  }, [authContext]);

  const handleBookService = () => {
    if (canBook) {
      if (selectedService) {
        if (cars.length !== 0) {
          navigation.navigate("ChooseCar", {
            selectedService: selectedService,
          });
        } else {
          setPopUpAlert({
            visible: true,
            title: "No cars",
            body: "You don't have any cars added, please add at least one car.",
            popUpActionText: "Add car",
            popUpActionHandler: () => navigation.navigate("RegisterCar"),
          });
        }
      } else {
        setPopUpAlert({
          visible: true,
          title: "No service",
          body: "Please select a service and try again.",
          popUpActionText: "Select service",
          popUpActionHandler: () => false,
        });
      }
    } else {
      setPopUpAlert({
        visible: true,
        title: "Limit exceeded",
        body: "Sorry, you have exceeded your reservations limit.",
        popUpActionText: "Okay",
        popUpActionHandler: () => false,
      });
    }
  };

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

  const fetchCars = useCallback(async () => {
    await authAxios
      .get("/car/myCars?page=1&limit=100")
      .then((response) => {
        setCars(response.data.result.data);
      })
      .catch((error) => console.log("cars no", error));
  }, []);

  useEffect(() => {
    checkReservationAvailabilty();
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
  <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={"handled"}
    >
      {isSignedWithApple ? (
        <CustomText
          text={"Welcome back"}
          size={30}
          num={1}
          fontFamily="bold"
          style={styles.helloText}
        />
      ) : (
        <CustomText
          text={`Hello, ${userData?.name}`}
          size={24}
          num={1}
          fontFamily="bold"
          style={styles.helloText}
        />
      )}

      <View style={{ flex: 1, marginTop: 25 }}>
        <CustomText text={"Services"} size={22} fontFamily="bold" />
        {/* Selected service */}
        {selectedService ? (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                color: Colors.WHITE,
                marginRight: 10,
              }}
            >
              Selected Service :
            </Text>
            <Text style={{ fontFamily: "Poppins-Bold", color: Colors.BUTTON }}>
              {selectedService.title}
            </Text>
          </View>
        ) : (
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: Colors.WHITE_GRAY,
              fontSize: 12,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            There's no currently selected service
          </Text>
        )}
        <Animatable.View useNativeDriver animation="fadeInLeft">
          <ScrollView
            horizontal
            style={{ paddingBottom: 20 }}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 15,
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
        </Animatable.View>
      </View>

      <Animatable.View useNativeDriver animation="fadeInUp">
        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={styles.Btn}
          text="Book Service"
          textSize={16}
          onPress={handleBookService}
        />
      </Animatable.View>

      <Animatable.View
        useNativeDriver
        animation="fadeInLeft"
        style={styles.carListHeader}
      >
        <CustomText text={"My Cars"} size={22} fontFamily="bold" />
        <TextBtn
          text="Add new car"
          textSize={8}
          textColor="placeholder"
          style={styles.addCarBtn}
          onPress={() => {
            navigation.navigate("RegisterCar");
          }}
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        useNativeDriver
        style={{ flex: 1, marginTop: 25 }}
      >
        {cars.length > 0 ? (
          <FlatList
            data={cars}
            renderItem={({ item }) => {
              return (
                <CarCard
                  item={item}
                  onEditPress={() => {
                    navigation.navigate("EditCar", { carId: item.id });
                  }}
                  fetchCars={fetchCars}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <CustomText
            size={11}
            text="There are no cars"
            style={styles.noCars}
          />
        )}
      </Animatable.View>

      {/* Tutorial popup */}
      <TutorialVideo />
    </Animated.ScrollView>
  );
};

export default HomeView;
