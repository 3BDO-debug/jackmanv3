import React, { FC, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import { Arrow } from '../../constants/svg';
import CustomText from '../../components/customText';
import { scaleHeightSize } from '../../styles/mixins';
import ChooseCarCard from '../../components/chooseCarCard';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  FETCH,
  SET_CAR_TYPE,
  SET_DEALER,
  SET_SELECTED_CAR,
} from '../../redux/actionTypes';
import payload from '../../api/payload';
import { useRecoilState, useRecoilValue } from 'recoil';
import carsAtom from '../../recoil/cars';
import bookingAtom from '../../recoil/booking';

interface ChooseCarViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseCarView: FC<ChooseCarViewProps> = ({ navigation }) => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const cars = useRecoilValue(carsAtom);
  const dispatch = useDispatch();

  const styles = useMemo(() => createStyles(), []);
  const [selected, setSelected] = useState(-1);
  const [booking, setBooking] = useRecoilState(bookingAtom);

  return (
    <View style={styles.container}>
      <CustomText
        text={'Choose your car'}
        size={25}
        fontFamily="bold"
        style={styles.helloText}
      />

      <View style={{ flex: 1, marginTop: scaleHeightSize(45) }}>
        <FlatList
          data={cars}
          renderItem={({ item, index }) => {
            return (
              <ChooseCarCard
                item={item}
                index={index}
                onSelected={() => {
                  setSelected(index);
                  setBooking({ carData: item });
                }}
                selected={selected}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
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
          dispatch({
            type: FETCH,
            payload: payload({
              actionType: 'FETCH',
              nextAction: SET_DEALER,
              serviceUrl: 'GET_DEALERS',
              requestMethod: 'GET',
              urlParams:
                '?page=1&manId=' + cars[selected].manufacturer.id,
              setToken: true,
            }),
          });
          navigation.navigate('ChooseServise');
        }}
      />
    </View>
  );
};

export default ChooseCarView;
