import React, { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, View, Text, Alert, BackHandler, Button } from 'react-native';
import { NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import createStyles from './styles';
import { Arrow } from '../../constants/svg';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import TextBtn from '../../components/textBtn';
import CarCard from '../../components/carCard';
import Animated from 'react-native-reanimated';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/colors';
import Toast from 'react-native-simple-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import authAtom from '../../recoil/auth';
import carsAtom from '../../recoil/cars';
import { AxiosContext } from '../../context/AxiosContext';
import { AndroidBackHandler } from "react-navigation-backhandler";
import { AuthContext } from '../../context/AuthContext';



interface HomeViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeView: FC<HomeViewProps> = ({ navigation }) => {



  const dispatch = useDispatch();
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const { authAxios } = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const [cars, setCars] = useRecoilState(carsAtom);

  const userData = useRecoilValue(authAtom)?.userData;
  const styles = useMemo(() => createStyles(), []);

  const route = useRoute();





  const handleCanBook = async () => {
    await authAxios.get("/user/auth/canReserve")
      .then((response) => {
        if (response.data.message) {
          navigation.navigate("ChooseCar");
        } else {
          Alert.alert("Sorry!, you have exceeded your reservations limits.");
        }
      })
      .catch((error) => console.log("error", error.response));
  };


  const backButtonHandler = useCallback(() => {
    /*
     *   Returning `true` from `onBackButtonPressAndroid` denotes that we have handled the event,
     *   and react-navigation's lister will not get called, thus not popping the screen.
     *
     *   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.
     * */

    if (route.name === "Home") {
      Alert.alert("Attention", "Do you want to exit the app ?", [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => false },
      ])
      return true;
    }

    return false;
  }, [route.name]);


  useEffect(() => {
    if (authContext.authState.authenticated) {
      authAxios
        .get('/car/myCars?page=1&limit=100')
        .then(response => {
          setCars(response.data.result.data);

        })
        .catch(error => console.log('cars no', error));
    } else {
      console.log("not auth", authContext);

    }
  }, [cars, authContext]);



  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);


  return (
    <AndroidBackHandler onBackPress={backButtonHandler}>
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps={'handled'}>
        {/* <Logo style={styles.logo} /> */}

        {/* <TouchableOpacity
        style={styles.menu}
        onPress={() => {
          console.log('******');
          // navigation.openDrawer();
        }}>
        {useDrawerStatus() === 'open' ? <XIcon /> : <MenuIcon />}
      </TouchableOpacity> */}


        <CustomText
          text={'Hello !\n' + (userData?.name || '')}
          size={25}
          num={2}
          fontFamily="bold"
          style={styles.helloText}
        />

        {/*         <View style={styles.estimateContainer}>


          {false ? (
            <View style={styles.timeContainer}>
              <View style={styles.timeElement}>
                <CustomText text="02" size={32} fontFamily="bold" color="black" />
                <CustomText text="Days" size={8} color="black" />
              </View>
              <CustomText text=":" size={32} fontFamily="bold" color="black" />

              <View style={styles.timeElement}>
                <CustomText text="02" size={32} fontFamily="bold" color="black" />
                <CustomText text="Hours" size={8} color="black" />
              </View>

              <CustomText text=":" size={32} fontFamily="bold" color="black" />

              <View style={styles.timeElement}>
                <CustomText text="02" size={32} fontFamily="bold" color="black" />
                <CustomText text="Seconds" size={8} color="black" />
              </View>
            </View>
          ) : (
            <CustomText
              color={'blaceholder'}
              size={8}
              style={{ alignSelf: 'center' }}
              text="There is no upcoming reservation"
            />
          )}
        </View>
 */}
        {/* <CustomText text={'Services'} size={22} fontFamily="bold" /> */}
        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={styles.Btn}
          text="Book Service"
          textSize={16}
          onPress={() => {
            if (cars.length == 0)
              Toast.show('There are no cars, add a new car to book', Toast.LONG);

            else handleCanBook();
          }}
        />

        <View style={styles.carListHeader}>
          <CustomText text={'My Cars'} size={22} fontFamily="bold" />
          <TextBtn
            text="Add new car"
            textSize={8}
            textColor="placeholder"
            style={styles.addCarBtn}
            onPress={() => {
              navigation.navigate('RegisterCar');
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          {cars.length > 0 ? (
            <FlatList
              data={cars}
              renderItem={({ item }) => {
                return (
                  <CarCard
                    item={item}
                    onEditPress={() => {
                      navigation.navigate('EditCar', { carId: item.id });
                    }}

                  />
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.seperator} />}
              contentContainerStyle={{}}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <CustomText
              size={11}
              text="There are no cars"
              style={styles.noCars}
            />
          )}
        </View>
      </Animated.ScrollView>
    </AndroidBackHandler>
  );
};





export default HomeView;
