import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useRecoilValue } from 'recoil';
import { ProfileSitting } from '..';
import CarCard from '../../components/carCard';
import CustomButton from '../../components/customButton';
import CustomText from '../../components/customText';
import { Colors } from '../../constants/colors';
import createStyles from './styles';
import authAtom from '../../recoil/auth';
import carsAtom from '../../recoil/cars';

interface ProfileViewProps {
  navigation: NavigationProp<ParamListBase>;
  route: NavigationRoute<ParamListBase>;
}

const ProfileView: FC<ProfileViewProps> = ({ navigation, route }) => {
  const state = useSelector((state: RootStateOrAny) => state.MainState);
  const user = useRecoilValue(authAtom)
  const userData = useRecoilValue(authAtom)?.userData;
  const cars = useRecoilValue(carsAtom)



  const windowWidth = Dimensions.get('window').width;
  const styles = useMemo(() => createStyles(), []);
  const [index, setIndex] = useState(0);
  const [shortName, setShortName] = useState('');

  const scrollRef = useRef();

  useEffect(() => {
    if (userData.name) {
      let splitName = userData?.name?.split(' ');
      if (splitName.length > 1) setShortName(splitName[0][0] + splitName[1][0]);
    }
    if (route.params?.type == 2) {
      scrollRef.current.scrollToEnd({ animated: true });
    } else scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }, [route.params?.type]);

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.circle}>
        {userData.photo ? (
          <Image
            source={userData.photo}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <CustomText
            text={
              userData?.name?.split(' ').length > 1
                ? userData?.name?.split(' ')[0][0] +
                userData?.name?.split(' ')[1][0]
                : userData?.name?.split(' ')[0][0]
            }
            size={32}
            fontFamily="bold"
            color="black"
            style={{ with: 160 }}
          />
        )}
      </View>
      <CustomText
        text={userData.name}
        size={26}
        fontFamily="bold"
        num={1}
        style={styles.text}
      />
      <View style={styles.tapsContainer}>
        <TouchableOpacity
          style={[
            styles.buttons,
            styles.button1,
            {
              borderBottomColor: !index ? Colors.BUTTON : Colors.WHITE,
              borderBottomWidth: !index ? 2 : 1,
            },
          ]}
          onPress={() => {
            scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
          }}>
          <CustomText text="CARS" size={12} fontFamily="bold" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttons,
            styles.button2,
            {
              borderBottomColor: !index ? Colors.WHITE : Colors.BUTTON,
              borderBottomWidth: !index ? 1 : 2,
            },
          ]}
          onPress={() => {
            scrollRef.current.scrollToEnd({ animated: true });
          }}>
          <CustomText text="SETTINGS" size={12} fontFamily="bold" />
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        horizontal={true}
        pagingEnabled={true}
        ref={scrollRef}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          setIndex(Math.round(event.nativeEvent.contentOffset.x / windowWidth));
        }}>
        <View style={{ width: windowWidth, paddingHorizontal: 20 }}>
          <View style={styles.listContainer}>
            {cars.length != 0 ? (
              <FlatList
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.seperator} />}
                data={cars}
                renderItem={({ item }) => {
                  return (
                    <CarCard
                      item={item}
                      onHistoryPress={() => {
                        navigation.navigate('CarHistory', { carId: item.id });
                      }}
                      onEditPress={() => {
                        navigation.navigate('EditCar', { carId: item.id });
                      }}
                    />
                  );
                }}
              />
            ) : (
              <CustomText
                size={11}
                text="There are no cars"
                style={styles.noCars}
              />
            )}
          </View>
          <CustomButton
            containerStyle={styles.confirtBtn}
            text="ADD NEW CAR"
            textSize={16}
            onPress={() => {
              navigation.navigate('RegisterCar');
            }}
          />
        </View>
        <View style={{ width: windowWidth, paddingHorizontal: 20 }}>
          <ProfileSitting />
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export default ProfileView;
