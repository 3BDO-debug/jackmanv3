import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomInput from '../../components/customInput';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ArrowIcon } from '../../constants/svg';
import FavCar from '../../components/favCar';
import Model from '../../components/modal';
import { AxiosContext } from '../../context/AxiosContext';

interface EditCarViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const EditCarView: FC<EditCarViewProps> = ({ route, navigation }) => {
  const [car, setCar] = useState(null);
  const [manufactures, setManufactures] = useState([]);
  const { authAxios } = useContext(AxiosContext);


  const [isLocation, setIsLocation] = useState(false);
  const [chasi, setChasi] = useState(car?.chassisName || null);
  const [plate, setPlate] = useState(car?.plateNo || null);
  const [type, setType] = useState(car?.carType || "");
  const [model, setModel] = useState(car?.modelYear?.toString());
  const [favCar, setFavCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [isType, setIsType] = useState(false);
  const [selectedtype, setSelectedType] = useState(car?.carType);
  const ediet = isLocation ? false : true;
  const [disableForValidation, setDisableForValidation] = useState(false);

  const rotation = useSharedValue(0);
  const typeRotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const animateTypeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${typeRotate.value}deg` }],
    };
  });


  const [carInfoNotEdited, setCarInfoNotEdited] = useState(true);
  const [fetching, setIsFetching] = useState(false);

  const styles = useMemo(() => createStyles(), []);

  const fetchCar = useCallback(async () => {
    await authAxios.get("/car/myCars").then((response) => {
      const cars = response.data.result.data;
      const selectedCarId = route.params?.carId;
      const selectedCar = cars.find((car) => car.id === selectedCarId);
      setCar(selectedCar);

    }).catch((error) => {
      Alert.alert("Somthing wrong happened fetching your car info.");
      console.log("error fetching car details", error.response);

    })
  }, [setCar, setIsFetching]);


  const fetchManufactures = useCallback(async () => {
    await authAxios.get("/manufacturer/get?page=1&limit=100")
      .then((response) => setManufactures(response.data.result.data))
      .catch((error) => console.log("error fetching manufactures", error.response)
      );
  }, []);

  const updateCarRequest = async () => {
    try {
      const data: any = {
        id: route.params?.carId,
        chassisName: chasi,
        plateNo: plate,
        carType: car?.carType,
        modelYear: parseInt(model, 10),
        manufacturer: car?.manufacturer?.id
      };
      await authAxios.patch("/car/updateMyCar", data).then(() => Alert.alert("Updated", "Car updated successfully!!!", [{ text: "cancel", onPress: () => false, style: "cancel" }, { text: "Go back to main menu", onPress: () => navigation.goBack() }])).catch((error) => {
        console.log("error updating car", error);
        Alert.alert("OPPSS", "Error while updating car!!");
      })

    } catch (error) {
      console.log("Main logic error", error)
      Alert.alert("Error", "Something wrong happened, we are getting it fixed soon.")
    }


  }


  useEffect(() => {
    if (car) {
      setChasi(car?.chassisName);
      setPlate(car?.plateNo);
      setModel(car?.modelYear?.toString());
    }
  }, [car])



  const fieldsUpdateHandler = useCallback((fieldName, value) => {
    setCarInfoNotEdited(false);
    if (fieldName === "chassisName") {
      setChasi(value)
    } else if (fieldName === "plateNo") {
      setPlate(value)
    }
  }, [setChasi, setPlate])




  /* Chassis effect */

  useEffect(() => {
    if (chasi === car?.chassisName) {
      setCarInfoNotEdited(true);
    } else {
      setCarInfoNotEdited(false);
    }
  }, [chasi])

  /* Car plate no effect */

  useEffect(() => {
    if (plate === car?.plateNo) {
      setCarInfoNotEdited(true);
    } else {
      setCarInfoNotEdited(false)
    }
  }, [plate])


  /* Car model year effect */

  useEffect(() => {
    if (model === car?.modelYear?.toString()) {
      setCarInfoNotEdited(true);
    } else {
      setCarInfoNotEdited(false);
    }

  }, [model])


  /* Car year model validator */

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (model > currentYear || model < 1000) {
      Alert.alert("Validation error", "Model year cannot be more than the current year");
      setDisableForValidation(true);
    } else {
      setDisableForValidation(false);
    }

  }, [model])

  /* Chassis number validator */

  useEffect(() => {
    if (car) {
      const chassisValidator = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/.test(chasi);
      if (!chassisValidator && chasi !== "") {
        Alert.alert("Validation error", "Chassis number invalid");
      } else if (chasi === "") {
        Alert.alert("Validation error", "Chassis number cannot be empty");
      }
    }
  }, [chasi, car])


  /* Plate number validator */

  useEffect(() => {
    if (car) {
      const plateNumberValidator = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/.test(plate);
      if (!plateNumberValidator && plate !== "") {
        Alert.alert("Validation error", "Plate number is invalid");
      } else if (plate === "") {
        Alert.alert("Validation error", "Plate number cannot be empty");
      }
    }
  }, [plate, car])




  useEffect(() => {
    setIsFetching(true);
    fetchCar();
    fetchManufactures();
    setIsFetching(false);
  }, [fetchCar, fetchManufactures])




  return (
    <>
      {fetching ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color={Colors.BUTTON} /></View> : <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={[styles.text]}>
          <CustomText text="Car Details " size={25} fontFamily="bold" />
        </View>

        <CustomInput
          placeholder="Chassis  number "
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={text => {
            fieldsUpdateHandler("chassisName", text);
          }}
          value={chasi}
        />

        <CustomInput
          placeholder="Plate Number "
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          caption=" * In Arabic"
          onChangeText={text => {
            fieldsUpdateHandler("plateNo", text);
          }}
          editable={ediet}
          value={plate}
        />

        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setFavCar(!favCar);
              if (favCar) rotation.value = withTiming(0);
              else rotation.value = withTiming(180);
            }}>
            <CustomText
              text={selectedCar || car?.manufacturer?.name}
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
              data={manufactures}
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
          <View style={styles.carModelContainer}>
            <TouchableOpacity
              style={styles.carModelDropDown}
              onPress={() => {
                Keyboard.dismiss();
                if (favCar) {
                  rotation.value = withTiming(0);
                  setFavCar(false);
                }
                if (selectedCar != 'Favourite car manufacture') {
                  setIsType(!isType);
                  if (isType) typeRotate.value = withTiming(0);
                  else typeRotate.value = withTiming(180);
                } else Alert.alert("Please select car first");
              }}>
              <CustomText
                text={type || car?.carType}
                size={11}
                color={selectedtype == 'Car Type' ? 'placeholder' : 'black'}
              />
              <Animated.View style={animateTypeStyle}>
                <ArrowIcon />
              </Animated.View>
            </TouchableOpacity>
            {isType && (
              <FlatList
                nestedScrollEnabled
                style={styles.carList}
                data={[
                  { year: 'hatchbag' },
                  { year: 'sedane' },
                  { year: 'fourbyfour' },
                ]}
                ItemSeparatorComponent={() => <View style={styles.line} />}
                renderItem={({ item }) => {
                  return (
                    <Model
                      item={item}
                      onPress={() => {
                        setIsType(false);
                        setType(item.year);
                        setSelectedType(item.year);
                        // setSelectedCarId(item.id);
                        if (isType) typeRotate.value = withTiming(0);
                        else typeRotate.value = withTiming(180);
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
          <CustomInput
            placeholder="Car Model Year"
            inputStyle={styles.input}
            containerStyle={[styles.smallInputContainer, { width: '48%' }]}
            onChangeText={text => {
              setModel(text);
            }}
            value={model}
            editable={ediet}
            keyboardType="numeric"
          />
        </View>

        <CustomButton
          containerStyle={[
            styles.confirtBtn,
            {
              backgroundColor:
                carInfoNotEdited ? Colors.GRAY : Colors.BUTTON
            },
          ]}
          text="SAVE CHANGES"
          textSize={16}
          onPress={updateCarRequest}
          disabled={
            carInfoNotEdited || disableForValidation
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          disabled={!ediet}>
          <Text style={styles.buttTextt}> DISCARD </Text>
        </TouchableOpacity>
      </ScrollView>}

    </>
  );
};

export default EditCarView;
