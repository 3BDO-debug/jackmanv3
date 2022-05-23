import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './customText';

interface ModelProps {
  containerStyle?: object;
  item: any;
  onPress: () => void;
}

const Model: FC<ModelProps> = ({containerStyle, item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CustomText text={item.year} size={11} color="button" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Model;   