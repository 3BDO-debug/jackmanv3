import React, { FC, useContext } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';
import TextBtn from './textBtn';
import Swipeout from 'react-native-swipeout';
import { DeleteIcon, EditIcon } from '../constants/svg';
import { useDispatch } from 'react-redux';
import {
  FETCH,
  SET_CARS,
  SET_CAR_HISTORY,
  SET_SELECTED_CAR,
} from '../redux/actionTypes';
import payload from '../api/payload';
import Toast from 'react-native-simple-toast';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import carCardAtom from '../recoil/carCard';
import { AxiosContext } from '../context/AxiosContext';
import { useNavigation } from '@react-navigation/native';
import carHistoryAtom from '../recoil/carHistory';

interface CarCardProps {
  containerStyle?: object;
  item: any;
  onHistoryPress?: (id: number) => void;
  onEditPress?: () => void;
}

const CarCard: FC<CarCardProps> = ({
  containerStyle,
  item,
  onHistoryPress,
  onEditPress,
}) => {
  const dispatch = useDispatch();
  const { authAxios } = useContext(AxiosContext);

  const deleteCarRequest = async () => {
    await authAxios.delete(`/car/remove/${item?.id}`).then(() => Alert.alert("Success", "Car had been deleted successfully.")).catch((error) => {
      console.log("error deleting car", error);
      Alert.alert("Error", "Opps!!, somthing wrong happened deleting car.");

    })
  }

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
          Toast.show(
            'cannot delete this car: this car has a reservation',
            Toast.LONG,
          );
        else
          Alert.alert('', 'Are you sure to delete it?', [
            {
              text: 'Cancel',
              onPress: () => { },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                deleteCarRequest();
              },
            },
          ]);
      },
    },
    {
      component: (
        <View style={[styles.hideBtn, { backgroundColor: 'gray' }]}>
          <EditIcon />
          <CustomText text="Edit" size={10} />
        </View>
      ),
      backgroundColor: Colors.BACKGROUND,
      onPress: () => {
        dispatch({ type: SET_SELECTED_CAR, data: item });
        if (onEditPress) onEditPress();
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
          <CustomText
            text={item?.carModel?.manufacturer}
            color="placeholder"
          />

          <View style={styles.bodyContainer}>
            <View style={styles.typeAndHistory}>
              <CustomText text={item?.manufacturer?.name} color="text1" size={16} />

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
    height: scaleHeightSize(80),
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyBtn: {
    marginLeft: 16,
  },
  typeAndHistory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideBtn: {
    width: scaleHeightSize(60),
    height: scaleHeightSize(60),
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    top: 10,
    marginLeft: 5,
    justifyContent: 'center',
  },
  hideContainer: {
    justifyContent: 'center',
  },
});
