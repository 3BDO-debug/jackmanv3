import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';
import TextBtn from './textBtn';

interface LoaderProps {

}

const Loader: FC<LoaderProps> = ({

}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.BUTTON} />

        </View>
    )
}


export default Loader;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.GRAY,
        opacity: .5,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },

})