import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, FlatList, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import CustomText from "../../components/customText";
import TextBtn from "../../components/textBtn";
import { scaleHeightSize } from "../../styles/mixins";
import CarHistoryCard from "../../components/carHistoryCard";
import LogoImage from "../../components/logo";
import { useRecoilValue } from "recoil";
import carHistoryAtom from "../../recoil/carHistory";
import { AxiosContext } from "../../context/AxiosContext";
import selectedServiceAtom from "../../recoil/selectedService";

interface CarHistoryViewProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const CarHistoryView: FC<CarHistoryViewProps> = ({ route, navigation }) => {
  const [carHistory, setCarHistory] = useState([]);
  const triggeredCarHistory = useRecoilValue(carHistoryAtom);
  const { authAxios } = useContext(AxiosContext);
  const selectedService = useRecoilValue(selectedServiceAtom);

  const carHistoryFetcher = useCallback(async () => {
    await authAxios
      .get(`/booking/myBookings?carId=${triggeredCarHistory}`)
      .then((response) => {
        if (selectedService) {
          setCarHistory(
            response.data.result.data?.filter(
              (booking) =>
                booking.status === "approved" &&
                booking.bookingType === selectedService.value
            )
          );
        } else {
          setCarHistory(
            response.data.result.data?.filter(
              (booking) => booking.status === "approved"
            )
          );
        }
      })
      .catch((error) => {
        console.log("error fetching car history", error.response);
        //Alert.alert("OPPS!!", "Error while fetching car history, we are working to fix it soon.")
      });
  }, [authAxios]);

  const styles = useMemo(() => createStyles(), []);

  useEffect(() => {
    carHistoryFetcher();
  }, []);

  console.log("dd", carHistory);

  return (
    <View style={styles.container}>
      <CustomText
        text={"Car History"}
        size={25}
        fontFamily="bold"
        style={styles.helloText}
      />

      {carHistory.length == 0 ? (
        <CustomText
          color={"white"}
          size={12}
          style={{ alignSelf: "center", opacity: 0.5, marginTop: 20 }}
          text="There is no history"
        />
      ) : (
        <>
          <View style={styles.carText}>
            <CustomText
              text={carHistory[0].car?.manufacturer?.name}
              color="text1"
              size={16}
            />
          </View>

          <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
            <FlatList
              data={carHistory}
              renderItem={({ item }) => {
                return <CarHistoryCard item={item} />;
              }}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}

      <TextBtn
        text="BACK TO MAIN MENU"
        textSize={12}
        textColor="white"
        fontFamily="bold"
        style={styles.backToMain}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default CarHistoryView;
