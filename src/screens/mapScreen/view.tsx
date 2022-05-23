import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  BackHandler,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import createStyles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import CustomButton from '../../components/customButton';
import {
  LocationIcon,
  MarkerIcon,
  SearchIcon,
  XCircleIcon,
} from '../../constants/svg';
import CustomText from '../../components/customText';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {Colors} from '../../constants/colors';
import {useDispatch} from 'react-redux';
import {SET_LOCATION} from '../../redux/actionTypes';

interface MapScreenViewProps {
  navigation: NavigationProp<ParamListBase>;
  latitude: number;
  longitude: number;
}

const apiKey = 'AIzaSyCVspEbhklDpXKgvG_Gt2mCn7c5oaa-Bdw';

const MapScreenView: FC<MapScreenViewProps> = ({
  navigation,
  latitude,
  longitude,
}) => {
  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false);
  const [latitudeState, setLatitudeState] = useState(latitude);
  const [longitudeState, setILongitudeState] = useState(longitude);
  const [latitudeDelta, setLatitudeDelta] = useState(0.015);
  const [longitudeDelta, setILongitudeDelta] = useState(0.0121);

  const [locationName, setIsLocationName] = useState('');

  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const styles = useMemo(() => createStyles(), []);

  const backAction = () => {
    if (isSearch) {
      setIsSearch(false);
      navigation.setOptions({headerShown: true});
    } else navigation.goBack();
    return true;
  };

  type GetLocationNameTypes = (lat: number, lng: number) => void;

  const getLocationName: GetLocationNameTypes = (lat, lng) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        lat +
        ',' +
        lng +
        '&key=' +
        apiKey,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('******', responseJson.results[0].address_components[1]);
        if (responseJson.results[0].address_components[1])
          setIsLocationName(
            responseJson.results[0].address_components[1].short_name,
          );
      })
      .catch(error => {
        console.error(error);
      });
  };

  const prevAmount = useRef({latitude, longitude}).current;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    if (prevAmount.latitude != latitude || prevAmount.longitude != longitude) {
      setLatitudeState(latitude);
      setILongitudeState(longitude);
      if (longitude != 0 && longitude != 0)
        getLocationName(latitudeState, longitudeState);
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [latitude, longitude]);

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.container}>
      <StatusBar barStyle={isSearch ? 'dark-content' : 'light-content'} />

      {isSearch ? (
        <View style={styles.textInputContainer}>
          <GooglePlacesAutocomplete
            ref={inputRef}
            keyboardShouldPersistTaps={'handled'}
            placeholder="Search"
            renderLeftButton={() => <SearchIcon />}
            renderRightButton={() => {
              return (
                <Pressable
                  onPress={() => {
                    inputRef.current?.clear();
                  }}>
                  <XCircleIcon />
                </Pressable>
              );
            }}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            onPress={(data, details = null) => {
              setLatitudeState(details?.geometry?.location.lat);
              setILongitudeState(details?.geometry?.location.lng);
              setIsLocationName(data.description);
              setIsSearch(false);
              navigation.setOptions({headerShown: true});
            }}
            query={{
              key: apiKey,
              language: 'en',
            }}
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: Colors.WHITE,
                borderColor: Colors.BLACK,
                borderWidth: 1,
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 5,
              },
              textInput: {
                width: '80%',
              },
            }}
          />
        </View>
      ) : (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: latitudeState,
              longitude: longitudeState,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            onRegionChangeComplete={region => {
              setLatitudeState(region.latitude);
              setILongitudeState(region.longitude);
              setLatitudeDelta(region.latitudeDelta);
              setILongitudeDelta(region.longitudeDelta);
              getLocationName(region.latitude, region.longitude);
            }}></MapView>

          <View style={styles.searchButtonContainer}>
            <CustomButton
              containerStyle={styles.searchButton}
              leftIcon={<SearchIcon />}
              text={
                locationName == '' ? 'Search for your address' : locationName
              }
              textColor="placeholder"
              textFontFamily="regular"
              textSize={11}
              onPress={() => {
                setIsSearch(true);
                navigation.setOptions({headerShown: false});
              }}
            />
          </View>

          <View style={styles.bottomPart}>
            <CustomText text="Your Location" size={12} color="placeholder" />

            <View style={styles.location}>
              <LocationIcon />

              <CustomText
                text={locationName == '' ? 'Current Location' : locationName}
                size={15}
                fontFamily="medium"
                color="black"
              />
            </View>

            <CustomButton
              containerStyle={styles.confirtBtn}
              text="CONFIRM"
              textSize={16}
              onPress={() => {
                dispatch({
                  type: SET_LOCATION,
                  data: {latitudeState, longitudeState, locationName},
                });

                navigation.goBack();
              }}
            />
          </View>

          <MarkerIcon
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '46.7%',
            }}
          />
        </>
      )}
    </ScrollView>
  );
};

export default MapScreenView;
