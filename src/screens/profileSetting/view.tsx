import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Switch, TextInput, View } from 'react-native';
import createStyles from './styles';
import CustomText from '../../components/customText';
import TextBtn from '../../components/textBtn';
import { Colors } from '../../constants/colors';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FETCH, SET_USER_DATA } from '../../redux/actionTypes';
import payload from '../../api/payload';
import * as NavigationService from '../../navigation/NavigationService';
import Toast from 'react-native-simple-toast';
import { scaleWidthSize } from '../../styles/mixins';
import { useRecoilValue } from 'recoil';
import authAtom from '../../recoil/auth';
import { AxiosContext } from '../../context/AxiosContext';

interface ProfileSittingViewProps { }

interface SittingProps {
  value: string;
  label: string;
  onChangeText: (text: string) => void;
  onEditPress: (isEdit: boolean) => void;
}

const Sitting: FC<SittingProps> = ({
  value,
  label,
  onChangeText,
  onEditPress,
}) => {
  const styles = useMemo(() => createStyles(), []);

  const [isEdit, setIsEdit] = useState(true);

  return (
    <View style={styles.block}>
      <CustomText text={label} color="placeholder" />

      <View style={styles.typeAndHistory}>
        {!isEdit ? (
          <TextInput
            value={value}
            maxLength={50}
            editable={isEdit ? false : true}
            style={styles.textInput}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
        ) : (
          <CustomText
            style={[styles.textInput, { width: scaleWidthSize(170) }]}
            num={1}
            text={value}
          />
        )}
        <TextBtn
          text={isEdit ? 'Edit' : 'Save'}
          textSize={14}
          textColor={isEdit ? 'placeholder' : 'white'}
          underline={false}
          onPress={() => {
            onEditPress(isEdit);
            setIsEdit(!isEdit);
          }}
        />
      </View>
    </View>
  );
};

const ProfileSittingView: FC<ProfileSittingViewProps> = () => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const userData = useRecoilValue(authAtom)?.userData;

  const styles = useMemo(() => createStyles(), []);

  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [locationName, setLocationName] = useState(userData?.loactionName);
  const [latitude, setlatitude] = useState(userData?.latitude);
  const [longitude, setlongitude] = useState(userData?.longitude);

  const { authAxios } = useContext(AxiosContext)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);




  const updateUserRequest = async () => {
    const data = {
      name: name,
      occupation: userData?.occupation,
      latitude: userData?.latitude,
      longitude: userData?.longitude,
      locationName: locationName,
      birthDate: userData?.birthDate,
      favManufacturer: "6"
    };

    await authAxios.patch("/user/auth/update", data).then(() => Alert.alert("Success", "Updated user info successfully.")).catch((error) => {
      console.log("error updating user data", error.response);
      Alert.alert("OPPS!!", "Something wrong happened updating user info.");
    })

  }

  useEffect(() => {
    if (userData.name != name) setName(userData.name);
    if (userData.email != email) setEmail(userData.email);
    if (userData.locationName != locationName)
      setLocationName(userData.locationName);

    if (Object.keys(state.location).length != 0) {
      if (latitude != state.location.longitudeState) {
        setLocationName(state.location.locationName);
        setlatitude(state.location.latitude);
        setlongitude(state.location.longitude);
      }
    }
  }, [state]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}>
      <Sitting
        label={'Username'}
        value={name}
        onChangeText={text => setName(text)}
        onEditPress={isEdit => {
          if (!isEdit && name != userData.name) {
            let checkName = /^[A-Za-z0-9][A-Za-z]+[A-Za-z0-9]$/.test(name);
            console.log("Da", checkName);

            if (!checkName) {
              Toast.show(
                '*Only letters(a-z) and numbers(0-9) are allowed',
                Toast.LONG,
              );
            } else
              updateUserRequest();
          }
        }}
      />
      {/*   <Sitting
        label={'Email'}
        value={email}
        onChangeText={text => setEmail(text)}
        onEditPress={isEdit => {
          if (!isEdit && email != userData.email) {
            let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(
              email,
            );
            if (!checkEmail) {
              Toast.show(
                '*Only letters(a-z) and numbers(0-9) are allowed',
                Toast.LONG,
              );
            } else
              updateUser({
                email: email,
              });
          }
        }}
      /> */}
      {/*       <Sitting
        label={'Location'}
        value={locationName}
        onChangeText={text => setLocationName(text)}
        onEditPress={isEdit => {
          if (!isEdit && locationName != userData.locationName)
            updateUser({
              locationName: locationName,
            });
          else if (isEdit) NavigationService.navigate('MapScreen');
        }}
      /> */}

      <View style={styles.block}>
        <CustomText text="Receive notifications" color="placeholder" />

        <View style={styles.bodyContainer}>
          <View style={styles.typeAndHistory}>
            <CustomText text={isEnabled ? 'Enabled' : 'Disabled '} />
          </View>

          <Switch
            style={{ height: '100%' }}
            trackColor={{ false: Colors.PLACEHOLDER, true: Colors.BUTTON }}
            thumbColor={Colors.WHITE}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default ProfileSittingView;
