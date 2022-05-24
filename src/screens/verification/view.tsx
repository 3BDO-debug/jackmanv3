import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import { Logo } from '../../constants/svg';
import CustomText from '../../components/customText';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_OTP_ERROR } from '../../redux/actionTypes';
import payload from '../../api/payload';

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

  useEffect(() => {
    if (messageError != '') {
      Alert.alert("", messageError);
      dispatch({ type: SET_OTP_ERROR, data: '' });
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

      <View style={styles.verifyInputView}>
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
                dispatch({
                  type: FETCH,
                  payload: payload({
                    actionType: 'FETCH',
                    body: data,
                    nextAction: SET_OTP_ERROR,
                    serviceUrl: 'VERIFY_OTP',
                    requestMethod: 'POST',
                    navigateTo: 'Personal',
                    navigationType: 'reset',
                    error: true,
                  }),
                });
              }
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default VerificationView;
