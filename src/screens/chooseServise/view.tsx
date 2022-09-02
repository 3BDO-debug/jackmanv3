import React, {
  FC,
  useMemo,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import CustomText from "../../components/customText";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Arrow, Logo } from "../../constants/svg";
import CustomButton from "../../components/customButton";
import { Colors } from "../../constants/colors";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import bookingAtom from "../../recoil/booking";
import ChooseDealerCard from "../../components/chooseDealerCard";
import DealerContainer from "../../components/DealerContainer";
import { AxiosContext } from "../../context/AxiosContext";
import popUpAlertAtom from "../../recoil/popUpAlert";
import selectedServiceAtom from "../../recoil/selectedService";

const { width: screenWidth } = Dimensions.get("window");

interface ChooseServiseViewProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ChooseServiseView: FC<ChooseServiseViewProps> = ({
  navigation,
  route,
}) => {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const { authAxios } = useContext(AxiosContext);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const styles = useMemo(() => createStyles(), []);
  const [booking, setBooking] = useRecoilState(bookingAtom);
  const setpopAlert: any = useSetRecoilState(popUpAlertAtom);
  const selectedService = useRecoilValue(selectedServiceAtom);

  const dealersFetcher = useCallback(async () => {
    setIsFetching(true);
    await authAxios
      .get(
        `/manufacturer/getDealers?manId=${booking?.carData?.manufacturer?.id}&service=${selectedService?.value}`
      )
      .then((response) => {
        if (response.data.result.data?.length > 0) {
          setDealers(response.data.result.data);
        } else {
          setpopAlert({
            visible: true,
            title: "No dealers",
            body: "Sorry, no dealers currently available for your car",
            popUpActionText: "Choose another car",
            popUpActionHandler: () => navigation.goBack(),
          });
        }
      })
      .catch((error) => {
        setpopAlert({
          visible: true,
          title: "Server error",
          body: "We are sorry, an error occured while trying to fetch dealers.",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });

        console.log("Error fetching dealers", error.response);
      });
    setIsFetching(false);
  }, []);

  const selectDealerHandler = (pressedDealer) => {
    if (pressedDealer === selectedDealer) {
      setSelectedDealer(null);
    } else {
      setSelectedDealer(pressedDealer);
    }
  };

  useEffect(() => {
    dealersFetcher();
  }, [dealersFetcher]);

  const renderDivider = (index) => {
    let renderDivider;
    if (dealers.length % 3 === 0) {
      renderDivider = true;
    } else {
      if (index + 2 === dealers.length) {
        renderDivider = false;
      } else if (index + 1 === dealers.length) {
        renderDivider = false;
      } else if (index === dealers.length) {
        renderDivider = false;
      } else {
        renderDivider = true;
      }
    }

    return renderDivider;
  };

  /*   const filterDealersData = useCallback(() => {
     const mappedData = dealers.filter((dealer) => {
      const dealerSupportedServices = dealer.services;
      for (let index = 0; index < dealerSupportedServices.length; index++) {
        const service = dealerSupportedServices[index];
        if (service.type === selectedService?.value) {
          return dealer;
        }
      }
    });
    setFilteredDealers(dealers);
  }, [dealers]); */

  /*   useEffect(() => {
    filterDealersData();
  }, [dealers]); */

  return (
    <View style={styles.container}>
      <CustomText text={"Choose service dealer"} size={25} fontFamily="bold" />
      {fetching ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.BUTTON} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingBottom: 100,
            marginTop: 40,
          }}
        >
          {dealers.map((dealer, index) => (
            <View style={{ width: "33.3%" }} key={index}>
              <DealerContainer
                dealerData={{
                  id: dealer?.id,
                  title: dealer?.name,
                  image: dealer?.image,
                }}
                onPressCallback={() => selectDealerHandler(dealer)}
                selectedDealer={selectedDealer}
                pressable
              />
              {renderDivider(index) && (
                <View
                  style={{
                    backgroundColor: Colors.GRAY,
                    height: 1,
                    marginVertical: 1,
                    width: 220,
                  }}
                ></View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
      <View
        style={{
          flex: 1,
          marginBottom: 50,
          justifyContent: "flex-end",
          marginTop: 10,
        }}
      >
        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={[
            styles.confirtBtn,
            { backgroundColor: selectedDealer ? Colors.BUTTON : Colors.GRAY },
          ]}
          onPress={() => {
            setBooking({ ...booking, dealerData: selectedDealer });
            if (route.params?.editingCar) {
              navigation.navigate("DealerDetails", { editingCar: true });
            } else {
              navigation.navigate("DealerDetails");
            }
          }}
          text="CONTINUE"
          textSize={16}
          disabled={!Boolean(selectedDealer)}
        />
      </View>
    </View>
  );
};

export default ChooseServiseView;
