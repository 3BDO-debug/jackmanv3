import React, { FC, useMemo, useState, useEffect, useRef, useContext, useCallback } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import createStyles from './styles';
import CustomText from '../../components/customText';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Arrow, Logo } from '../../constants/svg';
import CustomButton from '../../components/customButton';
import { Colors } from '../../constants/colors';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SET_CAR_SERVICE, SET_CAR_TYPE } from '../../redux/actionTypes';
import { useRecoilState } from 'recoil';
import bookingAtom from '../../recoil/booking';
import ChooseDealerCard from '../../components/chooseDealerCard';
import DealerContainer from '../../components/DealerContainer';
import { AxiosContext } from '../../context/AxiosContext';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const { width: screenWidth } = Dimensions.get('window');

interface ChooseServiseViewProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChooseServiseView: FC<ChooseServiseViewProps> = ({ navigation }) => {
  const [dealers, setDealers] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const { authAxios } = useContext(AxiosContext);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const styles = useMemo(() => createStyles(), []);
  const [booking, setBooking] = useRecoilState(bookingAtom);



  const dealersFetcher = useCallback(async () => {
    setIsFetching(true);
    await authAxios.get(`/manufacturer/getDealers?page=1&limit=5&manId=${booking?.carData?.id}`)
      .then((response) => setDealers(response.data.result.data))
      .catch((error) => {
        Alert.alert("Error", "Something wrong happened while fetching dealers. we are working on it.")
        console.log("Error fetching dealers", error.response);
      });
    setIsFetching(false);
  }, [])

  const selectDealerHandler = (pressedDealer) => {
    if (pressedDealer === selectedDealer) {
      setSelectedDealer(null)
    }
    else {
      setSelectedDealer(pressedDealer)
    }


  };


  useEffect(() => {
    dealersFetcher();
  }, [dealersFetcher]);




  return (
    <View style={styles.container}>
      <CustomText text={'Choose service dealer '} size={25} fontFamily="bold" />
      {fetching ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.BUTTON} />
        </View>
        :
        <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 100, marginTop: 40 }}>
          {dealers.map((dealer, index) =>
            <View style={{ width: "33.3%" }} key={index}>
              <DealerContainer
                dealerData={{ id: dealer?.id, title: dealer?.name, image: dealer?.image }}
                onPressCallback={() => selectDealerHandler(dealer)}
                selectedDealer={selectedDealer}
                pressable
              />
              {dealers.length > 3 && <View style={{ backgroundColor: Colors.GRAY, height: 1, marginVertical: 15 }}></View>}
            </View>
          )}



        </ScrollView>
      }
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}>
        <CustomButton
          rightIcon={<Arrow />}
          containerStyle={[styles.confirtBtn, { backgroundColor: selectedDealer ? Colors.BUTTON : Colors.GRAY }]}
          onPress={() => {
            console.log("Ds");

            setBooking({ ...booking, dealerData: selectedDealer });
            navigation.navigate('Booking');
          }}
          text="CONTINUE"
          textSize={16}
          disabled={!Boolean(selectedDealer)}
        />
      </View>
    </View>
  );
};

export default ChooseServiseView;
