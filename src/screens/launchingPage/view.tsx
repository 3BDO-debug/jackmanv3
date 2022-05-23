import React, { FC, useEffect, useMemo, useState, useCallback, } from 'react';
import { Alert, BackHandler, Image, ScrollView, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import { Arrow, Facebook, Google } from '../../constants/svg';
import { EGYPT, Logo } from '../../assets';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import TextBtn from '../../components/textBtn';
import { Colors } from '../../constants/colors';
import { scaleHeightSize } from '../../styles/mixins';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_PHONE } from '../../redux/actionTypes';
import payload from '../../api/payload';
import { AndroidBackHandler } from "react-navigation-backhandler";



interface IProps {
  navigation: NavigationProp<ParamListBase>;
  signGoogle?: () => void;
  singFacebook?: () => void;
}

const LaunchingPageView: FC<IProps> = ({
  route,
  navigation,
  signGoogle,
  singFacebook,
}) => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const phoneMessageError = state.phoneMessageError;

  const [phone, setPhone] = useState('');
  const [phoneErrorCaption, setPhoneErrorCaption] = useState('');

  const dispatch = useDispatch();

  const styles = useMemo(() => createStyles(), []);

  const backButtonHandler = useCallback(() => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (route.name === "LaunchingPage") {
      Alert.alert("Attention", "Do you want to exit the app ?", [{ text: 'Yes', onPress: () => BackHandler.exitApp() },
      { text: 'No', onPress: () => false },])
      return true;
    }

    return false;
  }, [route.name]);


  useEffect(() => {
    if (phoneMessageError) setPhoneErrorCaption(phoneMessageError);
  }, [phoneMessageError]);



  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="center" />

        <CustomText text="Enter Phone Number" size={15} fontFamily="medium" />

        <View style={styles.phoneContainer}>
          <View style={styles.flagContainer}>
            <Image source={EGYPT} style={styles.flag} />
          </View>
          <CustomInput
            required={true}
            containerStyle={styles.phoneInputContainer}
            placeholder="Enter your phone number"
            inputStyle={styles.input}
            keyboardType="phone-pad"
            caption={phoneErrorCaption}
            error={phoneErrorCaption != ''}
            maxLength={phone[0] == '0' ? 11 : 10}
            onChangeText={text => {
              setPhone(text);
            }}
            leftIcon={
              <CustomText
                text="+20"
                color="black"
                size={16}
                fontFamily="medium"
              />
            }
          />
        </View>

        <CustomText text="Create an account" size={32} fontFamily="bold" />

        <CustomText text="Join our community " size={12} color="placeholder" />

        <CustomButton
          leftIcon={<Google />}
          leftIconContainerStyle={styles.socialBtnIcon}
          containerStyle={[styles.googleBtn, styles.socialBtn]}
          text="Continue with Google"
          textSize={16}
          textColor="text1"
          textFontFamily="regular"
          onPress={signGoogle}
        />

        <CustomButton
          leftIcon={<Facebook />}
          leftIconContainerStyle={styles.socialBtnIcon}
          containerStyle={styles.socialBtn}
          text="Continue with Facebook"
          textSize={16}
          textColor="text1"
          textFontFamily="regular"
          onPress={singFacebook}
        />

        <View style={styles.textWithButtonContainer}>
          <CustomText
            text="Already have an account? "
            size={11}
            fontFamily="bold"
          />

          <TextBtn
            text="Sign In"
            textSize={11}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />
        </View>

        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={[
            styles.loginBtn,
            { backgroundColor: phone == '' ? Colors.GRAY : Colors.BUTTON },
          ]}
          text="LOG IN"
          textSize={16}
          disabled={phone == ''}
          onPress={() => {
            let validPhone = phone[0] != '0' ? '+20' + phone : '+2' + phone;
            if (/^\+201[0-5]+[0-9]+$/.test(validPhone)) {
              let data = {
                phoneNumber: validPhone,
              };
              dispatch({
                type: FETCH,
                payload: payload({
                  actionType: 'FETCH',
                  nextAction: SET_PHONE,
                  body: data,
                  serviceUrl: 'VERIFY',
                  requestMethod: 'POST',
                  navigateTo: 'Verification',
                  error: true,
                }),
              });
              setPhoneErrorCaption('');
            } else setPhoneErrorCaption('* Please enter a valid phone number');
          }}
        />

        <View style={styles.textWithButtonContainer}>
          <CustomText text="By signing up you agree to our " size={8} />

          <TextBtn
            text="Privacy Policy and Terms."
            textSize={8}
            textColor="white"
          />
        </View>
      </ScrollView>
    </AndroidBackHandler>
  );
};

export default LaunchingPageView;
