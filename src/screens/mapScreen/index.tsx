import React, {FC, useCallback, useEffect, useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MapScreenView from './view';
 //import Geolocation from '@react-native-community/geolocation';
import {RootStateOrAny, useSelector} from 'react-redux';
import {BackHandler, DeviceEventEmitter} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {goBack} from '../../navigation/NavigationService';

interface MapScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const MapScreen: FC<MapScreenProps> = ({navigation}) => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const lat = state.latitude;
  const long = state.longitude;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [openLocation, setOpenLocation] = useState(false);

  /* const handleCurrentLocation = () => {
    console.log('>>>> ', latitude);
    if (latitude == 0) {
      console.log('.........');
      try {
        Geolocation.getCurrentPosition(info => {
          console.log('>>infooooo>>>>', info);
          setLatitude(info.coords.latitude);
          setLongitude(info.coords.longitude);
        });
      } catch (error) {
        console.log('rrrrrrrrrrr', error);
      }
    } else {
      setLatitude(lat);
      setLongitude(long);
    }
  }; */

  const backAction = useCallback(() => {
    navigation.goBack();

    return true;
  }, []);

  useEffect(() => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: 'YES',
      cancel: 'NO',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false, // true ==> Trigger locationProviderStatusChange listener when the location state changes
    })
      .then(function (success) {
        console.log('ssssssss', success);
        handleCurrentLocation(); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
      })
      .catch(error => {
        console.log(error.message); // error.message => "disabled"
      });
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    DeviceEventEmitter.addListener(
      'locationProviderStatusChange',
      function (status) {
        // only trigger when "providerListener" is enabled
        console.log('>>>', status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        // handleCurrentLocation();
      },
    );

    return () => {
      LocationServicesDialogBox.stopListener();
      handler.remove();
    };
  }, []);

  useEffect(() => {
    /* handleCurrentLocation(); */
  }, [state]);

  return (
    <MapScreenView
      navigation={navigation}
      latitude={latitude}
      longitude={longitude}
    />
  );
};

export default MapScreen;
