import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import { ArrowIcon, Logo } from '../../constants/svg';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FavCar from '../../components/favCar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_TOKEN } from '../../redux/actionTypes';
import payload from '../../api/payload';
import { AxiosContext } from '../../context/AxiosContext';
import { AndroidBackHandler } from "react-navigation-backhandler";
import { useRecoilValue } from 'recoil';
import phoneTokenAtom from '../../recoil/phoneToken';



interface PersonalViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const PersonalView: FC<PersonalViewProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const messageError = state.messageError;
  const phoneToken = useRecoilValue(phoneTokenAtom);

  const [isLocation, setIsLocation] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occu, setOccu] = useState('');
  const [favCar, setFavCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState('Favourite car manufacture');
  const [selectedCarId, setSelectedCarId] = useState(-1);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [locationName, setlocationName] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [textDate, setTextDate] = useState('Date of Birth');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dis, setDis] = useState(false);
  const { publicAxios } = useContext(AxiosContext);


  const backButtonHandler = useCallback(() => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (route.name === "Personal") {
      navigation.navigate("LaunchingPage");
      return true;
    }

    return false;
  }, [route.name]);


  const submitHandler = async () => {
    const data: any = {
      email: email,
      password: password,
      name: name,
      phoneToken: phoneToken,
      latitude: 38.8951,
      longitude: -77.0364,
      locationName: "قسم التبين",
      birthDate: textDate,
      favManufacturer: selectedCarId,
      occupation: "occu"
    };

    await publicAxios.post("/user/auth/signup", data)
      .then((response) => {
        Alert.alert("Account created", "Your account had been created successfully.")
        console.log("hustle", response.data.result);
        navigation.navigate("SignIn");

      })
      .catch((error) => {
        console.log("error", error.response.data);
        if (error.response.data.responseCode === "USER_EXISTS") {
          Alert.alert("Email exists", "The email you entered is already in use !")
        } else {
          Alert.alert("Error", "Error while trying to signup, we are working on it.");
        }
      })
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      '-' +
      tempDate.getDate() +
      '-' +
      tempDate.getFullYear();
    setTextDate(fDate);
  };
  const styles = useMemo(() => createStyles(), []);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  /* useEffect(() => {
    if (Object.keys(state.location).length != 0) {
      setlocationName(state.location.locationName);
      setlatitude(state.location.latitude);
      setlongitude(state.location.longitude);
    }
    if (messageError != '') setEmailError(messageError);
  }, [state]); */

  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Logo style={styles.logo} />

        <CustomText text="Personal Information " size={25} fontFamily="bold" />

        <CustomInput
          placeholder="Username"
          inputStyle={styles.input}
          containerStyle={[styles.nameInput, styles.inputContainer]}
          required={true}
          onChangeText={text => {
            setName(text.trim());
          }}
          onFocus={() => {
            if (favCar) {
              rotation.value = withTiming(0);
              setFavCar(false);
            }
          }}
          value={name}
          maxLength={25}
          error={nameError != ''}
          caption={nameError}
        />

        <CustomInput
          placeholder="Email address "
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          required={true}
          onChangeText={text => {
            setEmail(text.trim());
          }}
          onFocus={() => {
            if (favCar) {
              rotation.value = withTiming(0);
              setFavCar(false);
            }
          }}
          value={email}
          maxLength={32}
          error={emailError != ''}
          caption={emailError}
        />

        <CustomInput
          password={true}
          placeholder="Password"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={text => {
            setPassword(text);
          }}
          onFocus={() => {
            if (favCar) {
              rotation.value = withTiming(0);
              setFavCar(false);
            }
          }}
          value={password}
          error={passwordError != ''}
          caption={passwordError}
        />

        {/*   <CustomButton
        containerStyle={styles.locationBtn}
        text={locationName ? locationName : 'Location'}
        textSize={11}
        textFontFamily="regular"
        textColor={isLocation ? 'black' : 'placeholder'}
        onPress={() => {
          setIsLocation(true);
          navigation.navigate('MapScreen');
        }}
      />
 */}
        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              Keyboard.dismiss();
              setFavCar(!favCar);
              if (favCar) rotation.value = withTiming(0);
              else rotation.value = withTiming(180);
            }}>
            <CustomText
              text={selectedCar}
              size={11}
              color={
                selectedCar == 'Favourite car manufacture'
                  ? 'placeholder'
                  : 'black'
              }
            />

            <Animated.View style={animatedStyle}>
              <ArrowIcon />
            </Animated.View>
          </TouchableOpacity>
          {favCar && (
            <FlatList
              nestedScrollEnabled
              style={styles.carList}
              data={state.manufacturer}
              ItemSeparatorComponent={() => <View style={styles.line} />}
              renderItem={({ item }) => {
                return (
                  <FavCar
                    item={item}
                    onPress={() => {
                      setFavCar(false);
                      setSelectedCar(item.name);
                      setSelectedCarId(item.id);
                      if (favCar) rotation.value = withTiming(0);
                      else rotation.value = withTiming(180);
                    }}
                  />
                );
              }}
            />
          )}
        </View>

        <View style={styles.birthAndOccupationContainer}>
          <TouchableOpacity
            style={styles.butDate}
            onPress={() => {
              setShow(true);
              setDis(true);
            }}>
            <CustomText
              text={textDate}
              style={styles.textDate}
              size={11}
              color={textDate == 'Date of Birth' ? 'placeholder' : 'black'}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display="default"
                onChange={onChange}
                maximumDate={
                  new Date(
                    new Date().getFullYear() - 8,
                    new Date().getMonth(),
                    new Date().getDay(),
                  )
                }
              />
            )}
          </TouchableOpacity>

          <CustomInput
            placeholder="Occupation"
            inputStyle={styles.input}
            containerStyle={styles.smallInputContainer}
            caption="*Optional"
            value={occu}
            onFocus={() => {
              if (favCar) {
                rotation.value = withTiming(0);
                setFavCar(false);
              }
            }}
            onChangeText={text => {
              setOccu(text.trim());
            }}
          />
        </View>

        <CustomButton
          containerStyle={[
            styles.confirtBtn,
            {
              backgroundColor:
                !name ||
                  !email ||
                  !password ||
                  textDate == 'Date of Birth'

                  ? Colors.GRAY
                  : Colors.BUTTON,
            },
          ]}
          text="CONFIRM"
          textSize={16}
          onPress={() => {
            let checkName = /^[A-Za-z0-9][A-Za-z]+[A-Za-z0-9]$/.test(name);
            let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(
              email,
            );
            let checkPassword =
              /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

            if (name.length < 3) {
              setNameError('*Name has to be more than 2 letters');
            } else if (!checkName) {
              setNameError('*Only letters(a-z) and numbers(0-9) are allowed');
            } else setNameError('');

            if (!checkEmail) {
              setEmailError('*Email is invalid');
            } else setEmailError('');

            if (!checkPassword) {
              setPasswordError(
                '*Password has to be at lest 8 characters and mix of letters, numbers and symbols',
              );
            } else setPasswordError('');

            if (checkName && checkEmail && checkPassword) {

              submitHandler();
            }
          }}
          disabled={
            !name ||
            !email ||
            !password ||
            textDate == 'Date of Birth'
          }
        />
      </ScrollView>
    </AndroidBackHandler>
  );
};

export default PersonalView;
