import React, { FC } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './customText';

interface BtnProps {
    text?: string,
    onPress?: () => void,
    style?: object,
    textSize?: number,
    textColor?: string,
    textStyle?: object,
    underline?: boolean,
    fontFamily?: string
}
const TextBtn: FC<BtnProps> = ({
    text,
    onPress,
    style,
    textSize = 12,
    textColor = "button",
    textStyle,
    underline = true,
    fontFamily = 'bold'
}) => {
    return (
        <TouchableOpacity
            activeOpacity={.75}
            onPress={onPress}
            style={[styles.touch, style]}
        >

                <CustomText
                    text={text}
                    color={textColor}
                    size={textSize}
                    fontFamily={fontFamily}
                    style={[{ textDecorationLine: underline ? 'underline' : 'none' }, textStyle]}
                />


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touch: {
        justifyContent: 'center',
    }
})

export default TextBtn;