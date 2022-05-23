import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, ScrollView, TextInput, BackHandler } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomText from '../../components/customText';
import CustomInput from '../../components/customInput';
import { Arrow, Logo } from '../../constants/svg';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SET_BOOKING_PERSONAL_DATA } from '../../redux/actionTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import authAtom from '../../recoil/auth';
import bookingAtom from '../../recoil/booking';

interface AdditionalInformationViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const AdditionalInformationView: FC<AdditionalInformationViewProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const styles = useMemo(() => createStyles(), []);
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const userData = useRecoilValue(authAtom).userData;

  const [booking, setBooking] = useRecoilState(bookingAtom)

  const [fullName, setFullName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phoneNumber);

  const [milage, setMilage] = useState('');

  const backAction = useCallback(() => {
    navigation.navigate('Booking', { step: '1' });

    return true;
  }, []);

  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => handler.remove();
  }, [backAction]);


  /* Validators */


  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Logo style={styles.logo} />

      <CustomText text="Additional Information " size={25} fontFamily="bold" />

      <CustomInput
        placeholder="Full Name"
        value={fullName}
        inputStyle={styles.input}
        containerStyle={[styles.nameInput, styles.inputContainer]}
        required={true}
        onChangeText={text => {
          setFullName(text.trim());
        }}
      />

      <CustomInput
        placeholder="Phone"
        value={phone}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        required={true}
        keyboardType="phone-pad"
        onChangeText={text => {
          setPhone(text.trim());
        }}
      />

      <CustomInput
        placeholder="Milage"
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        keyboardType="numeric"
        required={true}
        onChangeText={text => {
          setMilage(text.trim());
        }}
      />
      <View style={styles.viewText}>
        <CustomInput
          placeholder="Additional comments (If any)"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />
      </View>

      <CustomButton
        rightIcon={<Arrow />}
        containerStyle={[
          styles.confirtBtn,
          {
            backgroundColor:
              !fullName || !milage || !phone ? Colors.GRAY : Colors.BUTTON,
          },
        ]}
        disabled={!fullName || !milage || !phone}
        text="CONTINUE"
        textSize={16}
        onPress={() => {
          if (fullName != userData.name || phone != userData.phoneNumber)
            setBooking({ ...booking, userData: { userFullname: fullName, userPhone: phone, userCarMileage: milage } });
          navigation.navigate('Booking', { step: '2' });
        }}
      />
    </ScrollView>
  );
};

export default AdditionalInformationView;
