import React, { FC } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';

interface ButtonProps {
    onPress?: () => void,
    disabled?: boolean,
    text?: string,
    textSize?: number,
    textColor?: string,
    textFontFamily?: string,
    leftIcon?: JSX.Element,
    rightIcon?: JSX.Element,
    width?: string | number,
    height?: string | number,
    activeOpacity?: number,
    containerStyle?: object,
    textStyle?: object,
    leftIconContainerStyle?: object,
    rightIconContainerStyle?: object
}

const CustomButton: FC<ButtonProps> = ({
    onPress,
    disabled = false,
    text,
    textSize = 16,
    textColor,
    textFontFamily = 'bold',
    leftIcon,
    rightIcon,
    width = '100%',
    height = 56,
    activeOpacity = .5,
    containerStyle,
    textStyle,
    leftIconContainerStyle,
    rightIconContainerStyle,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            disabled={disabled}
            style={[
                {
                    width: width,
                    height: scaleHeightSize(height),
                    backgroundColor: Colors.BUTTON,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    flexDirection: 'row'
                },
                containerStyle
            ]}
        >
            {leftIcon && <View
                style={[{
                    marginRight: 5,
                }, leftIconContainerStyle]}
            >
                {leftIcon}
            </View>}
            <CustomText
                text={text}
                size={textSize}
                color={textColor}
                fontFamily={textFontFamily}
                style={textStyle}
            />
            {rightIcon && <View
                style={[{
                    marginLeft: 10,
                }, rightIconContainerStyle]}
            >
                {rightIcon}
            </View>}
        </TouchableOpacity>
    )
}


export default CustomButton;