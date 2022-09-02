import React, { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import { scaleHeightSize } from "../styles/mixins";
import CustomText from "./customText";
import TextBtn from "./textBtn";
import Swipeout from "react-native-swipeout";
import { DeleteIcon, EditIcon } from "../constants/svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import carCardAtom from "../recoil/carCard";
import { AxiosContext } from "../context/AxiosContext";
import { useNavigation } from "@react-navigation/native";
import carHistoryAtom from "../recoil/carHistory";
import popUpAlertAtom from "../recoil/popUpAlert";

const CarCard = ({
  containerStyle,
  item,
  onHistoryPress,
  onEditPress,
  fetchCars,
}) => {
  const { authAxios } = useContext(AxiosContext);
  const setpopUp = useSetRecoilState(popUpAlertAtom);

  const deleteCarRequest = async () => {
    await authAxios
      .delete(`/car/remove/${item?.id}`)
      .then(() =>
        setpopUp({
          visible: true,
          title: "Car deleted",
          body: "Car has been successfully deleted.",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        })
      )
      .catch((error) => {
        console.log("error deleting car", error);
        setpopUp({
          visible: true,
          title: "Error",
          body: "Sorry, something wrong happened while trying to delete car.",
          popUpActionText: "try again",
          popUpActionHandler: () => false,
        });
      });

    await fetchCars();
  };

  const navigation = useNavigation();

  var swipeoutBtns = [
    {
      component: (
        <View style={styles.hideBtn}>
          <DeleteIcon />
          <CustomText text="Remove" size={10} />
        </View>
      ),
      backgroundColor: Colors.BACKGROUND,
      onPress: () => {
        if (item.reserved)
          setpopUp({
            visible: true,
            title: "Notice!",
            body: "You cannot delete this car, car has an already on going reservation",
            popUpActionText: "okay",
            popUpActionHandler: () => false,
          });
        else
          setpopUp({
            visible: true,
            title: "Confirmation",
            body: "This car is about to be deleted, are you sure you want to continue ?",
            popUpActionText: "Continue",
            popUpActionHandler: () => deleteCarRequest(),
          });
      },
    },
    {
      component: (
        <View style={[styles.hideBtn, { backgroundColor: "gray" }]}>
          <EditIcon />
          <CustomText text="Edit" size={10} />
        </View>
      ),
      backgroundColor: Colors.BACKGROUND,
      onPress: () => {
        if (onEditPress) {
          navigation.navigate("EditCar", { carData: item });
        }
      },
    },
  ];

  const [swipedCarCard, setSwipedCarCard] = useRecoilState(carCardAtom);
  const setCarHistory = useSetRecoilState(carHistoryAtom);

  return (
    <Swipeout
      right={swipeoutBtns}
      buttonWidth={scaleHeightSize(70)}
      style={styles.hideContainer}
      backgroundColor={Colors.BACKGROUND}
      onOpen={() => setSwipedCarCard(item?.id)}
      close={swipedCarCard !== item.id}
    >
      {item.carType ? (
        <View style={[styles.container, containerStyle]}>
          <View style={styles.bodyContainer}>
            <View style={styles.typeAndHistory}>
              <CustomText
                text={item?.manufacturer?.name}
                color="text1"
                size={16}
              />

              <TextBtn
                text="History"
                textSize={8}
                textColor="placeholder"
                style={styles.historyBtn}
                onPress={() => {
                  setCarHistory(item?.id);
                  navigation.navigate("CarHistory");
                }}
              />
            </View>

            {/* <TextBtn
                        text="Edit"
                        textSize={14}
                        textColor="button"
                        underline={false}
                        style={styles.historyBtn}
                        onPress={onEditPress}
                    /> */}
          </View>
        </View>
      ) : (
        <View style={{ height: scaleHeightSize(90) }}></View>
      )}
    </Swipeout>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  bodyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyBtn: {
    marginLeft: 16,
  },
  typeAndHistory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  hideBtn: {
    width: scaleHeightSize(60),
    height: scaleHeightSize(60),
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginLeft: 5,
    justifyContent: "center",
  },
  hideContainer: {
    justifyContent: "center",
  },
});
