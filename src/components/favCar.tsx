import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './customText';

interface FavCarProps {
  containerStyle?: object;
  item: any;
  onPress: () => void;
}

const FavCar: FC<FavCarProps> = ({containerStyle, item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CustomText text={item.name} size={11} color="button" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default FavCar;
