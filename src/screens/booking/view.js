import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  BackHandler,
  Platform,
  Linking,
  ActivityIndicator,
  Alert,
  Text,
  Image,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import {
  DateIcon,
  Profile,
  LocationIcon,
  TimeIcon,
  Edit,
  HashtagIcon,
  PhoneNumberIcon,
  CARICON,
} from "../../constants/svg";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";
import TextBtn from "../../components/textBtn";
import CustomInput from "../../components/customInput";
import { ScrollView } from "react-native-gesture-handler";
import { Date, QrCodeBooking } from "..";
import moment from "moment";
import { useRecoilState, useSetRecoilState } from "recoil";
import bookingAtom from "../../recoil/booking";
import { AxiosContext } from "../../context/AxiosContext";
import Screen from "../../components/Screen";
import popUpAlertAtom from "../../recoil/popUpAlert";
// utils
import phoneNumberValidator from "../../utils/phoneNumberValidator";
import userFullnameValidator from "../../utils/userFullnameValidator";
import { AndroidBackHandler } from "react-navigation-backhandler";
import AdditionalInformation from "../addtional/AdditionalInformation";
import ActionButton from "../../components/ActionButton";

const BookingView = ({ navigation, route }) => {
  const [booking, setBooking] = useRecoilState(bookingAtom);
  const selectedCarName = booking?.carData?.manufacturer.name;
  const selectedCarModel = booking?.carData?.carType;
  const selectedCarChassisName = booking?.carData?.plateNo;
  const selecteDealerPhone = booking?.dealerData?.phoneNumber1;
  const selecteDealerLat = "state.carService ? state.carService.latitude : ''";
  const selecteDealerLng = "state.carService ? state.carService.longitude : ''";
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const windowWidth = Dimensions.get("window").width;
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPress, setIspress] = useState(true);
  const [confirm, setconfirm] = useState(false);

  useEffect(() => {
    if (booking) {
      setName(booking?.name);
      setPhone(booking?.phoneNumber);
    }
  }, [booking]);

  const StepItem = ({ number, title }) => {
    return (
      <View style={styles.stepContainer}>
        <View
          style={[
            styles.stepView,
            {
              backgroundColor:
                step >= parseInt(number) ? Colors.BUTTON : Colors.WHITE,
            },
          ]}
        >
          <CustomText
            color={step >= parseInt(number) ? "white" : "black"}
            text={number}
          />
        </View>
        <CustomText size={12} text={title} />
      </View>
    );
  };
  const styles = useMemo(() => createStyles(), []);

  const { authAxios } = useContext(AxiosContext);

  const [isBooking, setIsBooking] = useState(false);

  const handleBookingConfirmation = async () => {
    const dealerId = booking?.dealerData?.id;
    const carId = booking?.carData?.id;

    await authAxios
      .post("/booking/book", {
        dealer: dealerId,
        car: carId,
        requestedDate1: booking?.bookingDates[0].requestedDate1,
        requestedDate2: booking?.bookingDates[1].requestedDate2,
        requestedDate3: booking?.bookingDates[2].requestedDate3,
        bookingType: booking?.bookingType,
        longitude: booking?.longitude,
        latitude: booking?.latitude,
        locationName: booking?.locationName,
        clientName: booking?.name,
        phoneNumber: booking?.phoneNumber,
      })
      .then(() => {
        setStep(4);
        setPopUpAlert({
          visible: true,
          title: "Booked",
          body: "Your booking has been successfuly placed and we will contact you soon.",
          popUpActionText: "take me back",
          popUpActionHandler: () => navigation.navigate("Home"),
        });
      })
      .catch((error) => {
        console.log("error while booking", error.response.data.message);
        setPopUpAlert({
          visible: true,
          title: "Server error",
          body: "Something wrong happened while trying to proceed your booking request.",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      });

    setIsBooking(false);
  };

  const updateBookingData = useCallback(() => {
    setBooking({
      ...booking,
      name: name,
      phoneNumber: phone,
    });
  }, [name, phone]);

  const updateUserDataSubmission = useCallback(() => {
    let valid;

    if (name.length < 3) {
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Name cannot be less than 3 chars",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
      valid = false;
    } else {
      valid = true;
    }

    if (!phoneNumberValidator(phone)) {
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Phone number is not valid",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
      valid = false;
    } else {
      valid = true;
    }

    if (!userFullnameValidator(name)) {
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Full name is not valid",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
      valid = false;
    } else {
      valid = true;
    }

    /* if (!phoneNumberValidator(phone)) {
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Phone number is not valid",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    } else if (!userFullnameValidator(name)) {
      setPopUpAlert({
        visible: true,
        title: "Validation error",
        body: "Full name is not valid",
        popUpActionText: "okay",
        popUpActionHandler: () => false,
      });
    } else {
      setIspress(true);
      updateBookingData();
    }
 */

    if (valid) {
      setIspress(true);
      updateBookingData();
    }
  }, [name, setIspress, updateBookingData]);

  const backButtonHandler = () => {
    if (step === 2 && route.params.carDetailsEdited) {
      navigation.setParams({ carDetailsEdited: false });

      return true;
    }

    if (step === 1) {
      navigation.navigate("ChooseCar", { editingCar: null });
    } else {
      setStep(step - 1);
    }

    if (step === 4) {
      navigation.navigate("Home");
    }
    return true;
  };

  useEffect(() => {
    if (route.params?.carDetailsEdited) {
      setStep(3);
    }
  }, [route.params]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, []);

  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <Screen
        navigation={navigation}
        hideFooter={step === 3 ? false : true}
        isCustomBackHandler={true}
        customBackHandler={backButtonHandler}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ marginTop: 30, paddingBottom: 50 }}
          >
            <View style={styles.stepsContainer}>
              <View style={styles.stepsViewContainer}>
                <TouchableOpacity disabled={!isPress}>
                  <StepItem number="1" title="Select" />
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity disabled={!confirm}>
                  <StepItem number="2" title="Confirm" />
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity>
                  <StepItem number="3" title="Status" />
                </TouchableOpacity>
              </View>
              {/* Instructions text */}
            </View>
            {!route.params?.carDetailsEdited && step == 1 && (
              <View style={{ width: windowWidth }}>
                <Date
                  onPress={() => {
                    setconfirm(true);
                    setStep(2);
                  }}
                  navigation={navigation}
                />
              </View>
            )}

            {step == 3 && (
              <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.cardContainer}>
                  {isPress ? (
                    <>
                      <View style={styles.cardHeader}>
                        <CustomText
                          text="Personal Details"
                          color="black"
                          size={10}
                          fontFamily="bold"
                        />
                        <TouchableOpacity
                          style={{ height: 30 }}
                          onPress={() => {
                            setIspress(!isPress);
                          }}
                        >
                          <Edit />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cardBody}>
                        <View style={styles.rowItem}>
                          <Profile />
                          <CustomText
                            text={name}
                            color="black"
                            size={10}
                            style={styles.textItem}
                            num={2}
                          />
                        </View>

                        <View style={[styles.rowItem, styles.rightText]}>
                          <PhoneNumberIcon />
                          <CustomText
                            num={1}
                            text={phone}
                            color="black"
                            size={10}
                            style={styles.textItem}
                          />
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.cardHeader}>
                        <CustomText
                          text="Personal Details"
                          color="black"
                          size={10}
                          fontFamily="bold"
                        />
                        <TextBtn
                          text="Save changes"
                          textSize={10}
                          fontFamily="regular"
                          onPress={() => {
                            updateUserDataSubmission();
                          }}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <Profile />
                        <CustomInput
                          containerStyle={styles.inputContaier}
                          inputStyle={styles.input}
                          value={name}
                          onChangeText={(text) => {
                            setName(text);
                          }}
                          maxLength={32}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <PhoneNumberIcon />
                        <CustomInput
                          containerStyle={styles.inputContaier}
                          inputStyle={styles.input}
                          value={phone}
                          keyboardType="numeric"
                          onChangeText={(text) => {
                            /* if (/^(?=.*?[1-9])[0-9()-]+$/.test(text)) {
                              setPhone(text);
                            } else {
                              setPopUpAlert({
                                visible: true,
                                title: "Validation error",
                                body: "Phone number is not valid",
                                popUpActionText: "okay",
                                popUpActionHandler: () => false,
                              });
                            } */
                            setPhone(text);
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>

                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <CustomText
                      text="Car Details"
                      color="black"
                      size={10}
                      fontFamily="bold"
                    />
                    <Pressable
                      onPress={() => {
                        navigation.navigate("ChooseCar", { editingCar: true });
                      }}
                    >
                      <Edit />
                    </Pressable>
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.rowItem}>
                      <CARICON />
                      <CustomText
                        text={selectedCarName + " " + selectedCarModel}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>

                    <View style={[styles.rowItem, styles.rightText]}>
                      <HashtagIcon />
                      <CustomText
                        num={1}
                        text={selectedCarChassisName}
                        color="black"
                        size={10}
                        style={styles.textItem}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <CustomText
                      text="Dealership Details"
                      color="black"
                      size={10}
                      fontFamily="bold"
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <View style={[styles.rowItem]}>
                      <Image
                        source={require("../../assets/images/dealer.png")}
                        style={{ height: 20, width: 20, marginLeft: -2 }}
                      />
                      <Text
                        style={[
                          styles.location,
                          { fontFamily: "Poppins-Regular", fontSize: 12 },
                        ]}
                      >
                        {booking?.dealerData?.name}
                      </Text>
                    </View>
                    {booking?.dealerData.location ? (
                      <View style={[styles.rowItem]}>
                        <LocationIcon />
                        <TextBtn
                          text="Click for location"
                          textSize={9}
                          fontFamily="regular"
                          style={styles.location}
                          onPress={() => {
                            Linking.openURL(booking.dealerData.location).catch(
                              (error) => {
                                setPopUpAlert({
                                  visible: true,
                                  title: "Location unavilable",
                                  body: "Sorry we are unable to open dealer's location.",
                                  popUpActionText: "okay",
                                  popUpActionHandler: () => false,
                                });
                              }
                            );
                          }}
                        />
                      </View>
                    ) : (
                      <></>
                    )}

                    {selecteDealerPhone && (
                      <View style={[styles.rowItem, styles.rightText]}>
                        <PhoneNumberIcon />
                        <CustomText
                          text={selecteDealerPhone || ""}
                          color="black"
                          size={10}
                          style={styles.textItem}
                        />
                      </View>
                    )}
                  </View>

                  {booking?.bookingDates?.map((dateData) => {
                    return (
                      <View style={styles.cardBody}>
                        <View style={styles.rowItem}>
                          <DateIcon
                            color={Colors.BLACK}
                            width={16}
                            height={16}
                          />
                          <CustomText
                            text={moment(Object.values(dateData)[0]).format(
                              "Do MMM"
                            )}
                            color="black"
                            size={10}
                            style={styles.textItem}
                          />
                        </View>
                        <View style={[styles.rowItem, styles.rightText]}>
                          <TimeIcon color={Colors.BLACK} />
                          <CustomText
                            num={1}
                            text={moment(Object.values(dateData)[0]).format(
                              "HH.mm"
                            )}
                            color="black"
                            size={10}
                            style={styles.textItem}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {step === 2 && (
              <AdditionalInformation
                setStep={setStep}
                navigation={navigation}
              />
            )}

            {step == 4 && (
              <QrCodeBooking
                onDonePress={() => {
                  navigation.navigate("Home");
                }}
              />
            )}

            {step === 3 && (
              <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <ActionButton
                  icon={false}
                  loading={isBooking}
                  disabled={isBooking}
                  onPress={handleBookingConfirmation}
                  title="Book now"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </Screen>
    </AndroidBackHandler>
  );
};

export default BookingView;
