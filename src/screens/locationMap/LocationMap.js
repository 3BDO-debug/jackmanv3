import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSetRecoilState } from "recoil";
import { scale } from "react-native-size-matters";
import { Input, Icon as RNEUIICON } from "@rneui/themed";
// context
import { AxiosContext } from "../../context/AxiosContext";
// atoms
import userLocationAtom from "../../recoil/userLocation";
// utils
import getRegionForCoordinates from "../../utils/getRegionForCoordinates";
// theme
import { Colors } from "../../constants/colors";
// components
import CustomButton from "../../components/customButton";
// stylesheet
import styles from "./LocationMapStyles";

// ---------------------------------------------------------------------------

const LocationMap = ({ route, navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const { publicAxios } = useContext(AxiosContext);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [region, setRegion] = useState(null);
  const updateUserLocation = useSetRecoilState(userLocationAtom);

  const googlePlacesAutocompleteRef = useRef();

  const [typing, setIsTyping] = useState(false);

  const fetchUserInitialLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission error", "Please enable location permission");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setUserLocation(
      getRegionForCoordinates([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      ])
    );
  }, [Location, setUserLocation, getRegionForCoordinates]);

  const fetchLocationName = useCallback(async () => {
    setFetchingLocation(true);
    await publicAxios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedLocation.latitude},${selectedLocation.longitude}&key=AIzaSyCVspEbhklDpXKgvG_Gt2mCn7c5oaa-Bdw`
      )
      .then((response) =>
        setSelectedLocationName(response.data.results[0].formatted_address)
      )
      .catch((error) => {
        console.log("error fetching place name", error);
      });
    setFetchingLocation(false);
  }, [selectedLocation]);

  const fetchPlaceCords = useCallback(async (placeId) => {
    await publicAxios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${placeId}&key=AIzaSyCVspEbhklDpXKgvG_Gt2mCn7c5oaa-Bdw`
      )
      .then((response) => {
        // nse.data.result.geometry.location.lng
        setUserLocation(
          getRegionForCoordinates([
            {
              latitude: response.data.result.geometry.location.lat,
              longitude: response.data.result.geometry.location.lng,
            },
          ])
        );
        setSelectedLocation({
          latitude: response.data.result.geometry.location.lat,
          longitude: response.data.result.geometry.location.lng,
        });
      })
      .catch((error) => {
        console.log("Error fetching place cords", error.response);
      });
  }, []);

  const confirmPinLocationHandler = () => {
    updateUserLocation({
      locationName: selectedLocationName,
      cords: userLocation,
    });
    navigation.goBack();
  };

  useEffect(() => {
    fetchUserInitialLocation();
  }, []);

  useEffect(() => {
    if (selectedLocation !== null) {
      fetchLocationName();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (googlePlacesAutocompleteRef.current?.getAddressText().length === 0) {
      setIsTyping(false);
    }
  }, [googlePlacesAutocompleteRef.current?.getAddressText()]);

  return (
    <View style={styles.container}>
      {/* Map header */}
      <View style={styles.mapHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" color={Colors.WHITE} size={20} />
        </TouchableOpacity>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image source={require("../../assets/images/logo.png")} />
        </View>
      </View>
      {/* Location search  */}
      <View style={styles.locationSearchWrapper}>
        <View style={styles.locationSearchContainer}>
          <GooglePlacesAutocomplete
            ref={googlePlacesAutocompleteRef}
            placeholder="Search"
            onPress={(data) => {
              // 'details' is provided when fetchDetails = true
              fetchPlaceCords(data.place_id);
            }}
            query={{
              key: "AIzaSyCVspEbhklDpXKgvG_Gt2mCn7c5oaa-Bdw",
              language: "en",
            }}
            styles={{
              textInput: styles.locationSearchTextInput,
            }}
            textInputProps={{
              InputComp: Input,
              style: {},
              containerStyle: {
                backgroundColor: Colors.WHITE,
                elevation: 10,
                borderRadius: 18,
                paddingHorizontal: 20,
                height: "60%",
                width: "100%",
              },
              underlineColorAndroid: "transparent",
              inputStyle: {
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                marginLeft: 10,
              },
              inputContainerStyle: {
                borderColor: "transparent",
              },
              selectionColor: Colors.BUTTON,
              rightIcon: (
                <TouchableOpacity
                  onPress={() => {
                    if (typing) {
                      googlePlacesAutocompleteRef.current?.clear();
                      setIsTyping(false);
                      setSelectedLocation(null);
                      setSelectedLocationName(null);
                    }
                  }}
                >
                  <Icon
                    name={
                      typing ? "ios-close-circle-outline" : "search-outline"
                    }
                    size={20}
                  />
                </TouchableOpacity>
              ),
              rightIconContainerStyle: {
                marginLeft: 10,
              },
              onChangeText: () => setIsTyping(true),
            }}
          />
        </View>
      </View>
      <MapView
        initialRegion={selectedLocation || userLocation}
        style={styles.map}
        showsUserLocation={true}
        onPress={(event) => setSelectedLocation(event.nativeEvent.coordinate)}
        region={region}
        maxZoomLevel={16}
        minZoomLevel={2}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      {/* Location details card */}
      <View style={[styles.locationDetailsCardWrapper, { bottom: scale(10) }]}>
        <View style={styles.locationDetailsCardContainer}>
          <Text style={styles.locationDetailsCardTitle}>Current location</Text>
          {/* Selected location container */}
          <View style={styles.selectedLocationContainer}>
            <Icon name="location-outline" color={Colors.BLACK} size={20} />
            {fetchingLocation ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <ActivityIndicator size="large" color={Colors.BUTTON} />
              </View>
            ) : (
              <Text style={styles.selectedLocationText}>
                {selectedLocationName ||
                  "No location had been selected on the map"}
              </Text>
            )}
          </View>
          <CustomButton
            text="Confirm pin location"
            textSize={12}
            containerStyle={{ marginTop: 10 }}
            onPress={confirmPinLocationHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default LocationMap;
