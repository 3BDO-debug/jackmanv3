import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, TextInput, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import { Logo } from '../../constants/svg';
import CustomText from '../../components/customText';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_OTP_ERROR } from '../../redux/actionTypes';
import payload from '../../api/payload';
import { AxiosContext } from '../../context/AxiosContext';
import { Colors } from '../../constants/colors';
import { useSetRecoilState } from 'recoil';
import phoneTokenAtom from '../../recoil/phoneToken';

interface VerificationViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const VerificationView: FC<VerificationViewProps> = ({ navigation }) => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const messageError = state.messageError;
  const id = state.phone.id;

  const styles = useMemo(() => createStyles(), []);

  const dispatch = useDispatch();

  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [token, setToken] = useState('');

  const [otpError, setOtpError] = useState('');

  const { publicAxios } = useContext(AxiosContext);
  const [verifying, setVerifying] = useState(false);
  const setPhoneToken = useSetRecoilState(phoneTokenAtom);

  const verifyOTPRequest = async (data) => {
    setVerifying(true);
    await publicAxios.post("/user/auth/verifyotp", data)
      .then((response) => {
        setPhoneToken(response.data.phoneToken);
        navigation.navigate("Personal");

      })
      .catch((error) => {
        if (error.response.status === 400) {
          Alert.alert("OTP invalid", "You have entered invalid OTP.")
        } else {
          Alert.alert("Error occured", "Something wrong happened verifying the OTP.")
        }
      });
    setVerifying(false);
  };

  useEffect(() => {
    if (messageError != '') {
      Alert.alert("", messageError);

    }
  }, [messageError]);

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Logo style={styles.logo} />

      <CustomText text="Verify your account" size={30} fontFamily="bold" />

      <CustomText
        text="Enter the 4 digits number, sent via SMS"
        size={12}
        color="placeholder"
      />

      {verifying ? <View style={{ flex: 1, marginTop: 50 }}>
        <ActivityIndicator size="large" color={Colors.BUTTON} />
      </View> : <View style={styles.verifyInputView}>
        <CustomInput
          inputRef={input1}
          value={num1}
          keyboardType="number-pad"
          containerStyle={styles.textInput}
          inputStyle={styles.input}
          fontFamily="bold"
          maxLength={1}
          autoFocus={true}
          onChangeText={text => {
            setNum1(text);
            if (text != '') {
              input2.current?.focus();
            }
          }}
        />

        <CustomInput
          inputRef={input2}
          value={num2}
          keyboardType="number-pad"
          containerStyle={styles.textInput}
          inputStyle={styles.input}
          fontFamily="bold"
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            console.log('+=====', num2);
            if (nativeEvent.key === 'Backspace' && num2 == '') {
              setNum1('');
              input1.current?.focus();
            }
          }}
          onChangeText={text => {
            setNum2(text);
            if (text != '') {
              input3.current?.focus();
            } else input1.current?.focus();
          }}
        />

        <CustomInput
          inputRef={input3}
          value={num3}
          keyboardType="number-pad"
          containerStyle={styles.textInput}
          inputStyle={styles.input}
          fontFamily="bold"
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && num3 == '') {
              setNum2('');
              input2.current?.focus();
            }
          }}
          onChangeText={text => {
            setNum3(text);
            if (text != '') {
              input4.current?.focus();
            } else input2.current?.focus();
          }}
        />

        <CustomInput
          inputRef={input4}
          value={num4}
          keyboardType="number-pad"
          containerStyle={styles.textInput}
          inputStyle={styles.input}
          fontFamily="bold"
          maxLength={1}
          returnKeyType="go"
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && num4 == '') {
              setNum3('');
              input3.current?.focus();
            }
          }}
          onChangeText={text => {
            setNum4(text);
            if (text == '') input3.current?.focus();
            else {
              let token = '' + num1 + num2 + num3 + text;
              setToken(token);
              if (token.length == 4) {
                let data = {
                  otpCode: token,
                  id: id.toString(),
                };
                verifyOTPRequest(data)
              }
            }
          }}
        />

      </View>}
    </ScrollView>
  );
};

export default VerificationView;
