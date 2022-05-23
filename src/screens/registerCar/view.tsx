import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Modal,
  Keyboard,
  ActivityIndicator,
  Alert,
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
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import FavCar from '../../components/favCar';
import Model from '../../components/modal';
import { FETCH, SET_CARS, SET_MANUFACTURER } from '../../redux/actionTypes';
import payload from '../../api/payload';
import Toast from 'react-native-simple-toast';
import { AxiosContext } from '../../context/AxiosContext';
import { useRecoilState, useSetRecoilState } from 'recoil';
import carsAtom from '../../recoil/cars';


interface RegisterViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterView: FC<RegisterViewProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootStateOrAny) => state.MainState);

  const [isLocation, setIsLocation] = useState(false);
  const [name, setName] = useState('');
  const [chasi, setChasi] = useState('');
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [favCar, setFavCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState('Favourite car manufacture');
  const [selectedCarId, setSelectedCarId] = useState(-1);
  const [selectedYear, setSelectedYear] = useState('Car Model Year');
  const [selectedtype, setSelectedType] = useState('Car Type');
  const [chassisError, setChassisError] = useState('');
  const [plateError, setPlateError] = useState('');

  const [isModal, setIsModal] = useState(false);
  const [isType, setIsType] = useState(false);

  const ediet = isLocation ? false : true;

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const rotates = useSharedValue(0);
  const typRotates = useSharedValue(0);

  const animateModelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${typRotates.value}deg` }],
    };
  });

  const typeRotate = useSharedValue(0);

  const animateTypeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${typeRotate.value}deg` }],
    };
  });

  const { authAxios } = useContext(AxiosContext);


  const [carIsAdding, setCarIsAdding] = useState(false);

  const [cars, setCars] = useRecoilState(carsAtom);


  const handleAddCar = async () => {


    setCarIsAdding(true)

    await authAxios.post("/car/add", {
      chassisName: chasi,
      plateNo: plate,
      carType: type,
      modelYear: model,
      manufacturer: selectedCarId,
    }).then((response) => {
      authAxios
        .get('/car/myCars?page=1&limit=100')
        .then(response => {
          setCars(response.data.result.data);

        })
        .catch(error => console.log('cars no', error));
      Alert.alert("Car has been added successfully");
    }).catch((error) => Alert.alert("Oppps, someting wrong happened while adding car,"));


    setChasi("");
    setPlate("");
    setType("");
    setModel("");
    setSelectedCarId("");
    setCarIsAdding(false);
  }

  const styles = useMemo(() => createStyles(), []);



  const actionButtonDisabler = useCallback(() => {
    let disable = false;
    if (!chasi) {
      disable = true;
    }
    if (!plate) {
      disable = true
    }
    if (!type) {
      disable = true
    }
    if (model === '') {
      disable = true
    }

    return disable
  }, [chasi, plate, type, model])

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      overScrollMode="auto">
      <View style={[styles.text]}>
        <CustomText text="Adding new car " size={25} fontFamily="bold" />
      </View>

      {/* <CustomInput
        placeholder="Name of car owner"
        inputStyle={styles.input}
        value={name}
        containerStyle={[styles.nameInput, styles.inputContainer]}
        caption=" * As stated in license"
        onChangeText={text => {
          setName(text.trim());
        }}
        editable={ediet}
      /> */}

      <CustomInput
        placeholder="Chassis number "
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        onChangeText={text => {
          setChasi(text);
        }}
        error={chassisError != ''}
        caption={chassisError}
        onFocus={() => {
          if (favCar) {
            rotation.value = withTiming(0);
            setFavCar(false);
          }
          if (isType) {
            typeRotate.value = withTiming(0);
            setIsType(false);
          }
        }}
        editable={ediet}
      />

      <CustomInput
        placeholder="Plate Number "
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        caption={plateError == '' ? ' * In Arabic' : plateError}
        error={plateError != ''}
        onChangeText={text => {
          setPlate(text);
        }}
        onFocus={() => {
          if (favCar) {
            rotation.value = withTiming(0);
            setFavCar(false);
          }
          if (isType) {
            typeRotate.value = withTiming(0);
            setIsType(false);
          }
        }}
        editable={ediet}
      />

      <View style={styles.dropDownContainer}>
        <TouchableOpacity
          style={styles.dropDown}
          onPress={() => {
            Keyboard.dismiss();

            if (isType) {
              typeRotate.value = withTiming(0);
              setIsType(false);
            }
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
              } else Toast.show('Please select car first', Toast.LONG);
            }}>
            <CustomText
              text={selectedtype}
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
          placeholder="Car year model"
          inputStyle={styles.input}
          containerStyle={[styles.inputContainer, { width: '48%' }]}
          keyboardType="number-pad"
          onChangeText={text => {
            setSelectedYear(text);
            setModel(text);
          }}
          onFocus={() => {
            if (favCar) {
              rotation.value = withTiming(0);
              setFavCar(false);
            }
            if (isType) {
              typeRotate.value = withTiming(0);
              setIsType(false);
            }
          }}
          editable={ediet}
        />
      </View>

      {carIsAdding ? <ActivityIndicator size="large" color={Colors.BUTTON} style={styles.confirtBtn} /> : <CustomButton
        containerStyle={[
          styles.confirtBtn,
          {
            backgroundColor:
              actionButtonDisabler() ? Colors.GRAY : Colors.BUTTON,
          },
        ]}
        text="CONFIRM"
        textSize={16}
        onPress={() => {
          let checkChasi = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/.test(chasi);
          let checkPlate = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/.test(plate);

          if (!checkChasi) {
            setChassisError(
              '*the chassis number has to be a mix of letters and numbers',
            );
          } else setChassisError('');

          if (!checkPlate) {
            setPlateError(
              '*the plate number has to be a mix of letters and numbers',
            );
          } else setPlateError('');

          if (checkChasi && checkPlate) {
            handleAddCar();
          }
        }}
        disabled={actionButtonDisabler()}
      />}
    </ScrollView>
  );
};

export default RegisterView;
