import React, { FC, useMemo, useState, useContext, useCallback, useEffect } from 'react';
import { Alert, ScrollView, ActivityIndicator, Button } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import LogoImage from '../../components/logo';
import { AxiosContext } from '../../context/AxiosContext';

interface ForgetPasswordViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const ForgetPasswordView: FC<ForgetPasswordViewProps> = ({ navigation }) => {
  const [emailAdress, setEmailAderess] = useState('');
  const styles = useMemo(() => createStyles(), []);
  const { publicAxios } = useContext(AxiosContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);

  const emailAddressValidator = useCallback(() => {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let valid;
    if (email.test(emailAdress)) {
      setEmailNotValid(false)
      valid = true
    } else {
      valid = false
      setEmailNotValid(true)
    }
    return valid;
  }, [emailAdress])

  const handleSubmit = async () => {
    if (emailAddressValidator()) {
      setSubmitting(true);
      await publicAxios
        .post('/user/auth/resetPassword', { email: emailAdress })
        .then((response: any) => {
          navigation.navigate("SignIn");
          Alert.alert("Instructions has been sent to your email to reset your password.");
        })
        .catch((error: any) => {
          if (error.response.status === 400) {
            Alert.alert("Error", "Your account is signed up with gmail, cannot reset password")
          } else {
            Alert.alert("Error occured, please try again later.");

          }
        }

        );
      setSubmitting(false);
    } else {
      setEmailNotValid(true);
    }
  };






  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}
      scrollEnabled={false}
      contentContainerStyle={styles.contentContainer}>
      <LogoImage />
      <CustomText text="Forgot password ?" size={32} fontFamily="bold" />

      <CustomText
        text={
          'Enter your email below and we will send you a' + '\n' + 'reset email'
        }
        size={12}
        color="placeholder"
      />

      <CustomInput
        placeholder="Your Email Address"
        inputStyle={styles.input}
        value={emailAdress}
        onChangeText={text => setEmailAderess(text.trim())}
        containerStyle={styles.emailInput}
      />

      {emailNotValid && <CustomText style={{ flex: 1, color: Colors.RED, marginBottom: 15 }} size={12} text='Please enter a valid email' color={Colors.RED} />}

      {isSubmitting ? <ActivityIndicator size="large" color={Colors.BUTTON} style={styles.loginBtn} />
        :
        <CustomButton
          disabled={!emailAdress}
          containerStyle={{ backgroundColor: !emailAdress ? Colors.GRAY : Colors.BUTTON }}
          text='SUBMIT'
          onPress={handleSubmit}
          title='SUBMIT'
        />}
    </ScrollView>
  );
};

export default ForgetPasswordView;
