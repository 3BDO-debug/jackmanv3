import React, { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { ShowPass, NotShowPass } from '../constants/svg';
import { scaleHeightSize } from '../styles/mixins';
import CustomText from './customText';

interface InputProps {
  placeholder?: string;
  containerStyle?: object;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
  editable?: boolean;
  inputStyle?: object;
  leftIcon?: JSX.Element;
  fontFamily?: string;
  value?: string;
  password?: boolean;
  error?: boolean;
  caption?: string;
  required?: boolean;
  inputRef?: any;
  maxLength?: number;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  onKeyPress?: any;
  onFocus?: () => void;
  rightIcon: boolean;
  rightIconComponent: any

}

const CustomInput: FC<InputProps> = ({
  placeholder,
  containerStyle,
  onChangeText = () => { },
  keyboardType = 'default',
  autoFocus = false,
  editable = true,
  inputStyle,
  leftIcon,
  fontFamily = 'regular',
  value,
  password,
  error,
  caption,
  required,
  inputRef,
  maxLength,
  onSubmitEditing = () => { },
  returnKeyType = 'default',
  onKeyPress,
  onFocus,
  rightIcon,
  rightIconComponent
}) => {
  const chooseFontFamily = (font: string) => {
    switch (font) {
      case 'extraBold':
        return 'Poppins-ExtraBold';
      case 'bold':
        return 'Poppins-Bold';
      case 'semiBold':
        return 'Poppins-SemiBold';
      case 'medium':
        return 'Poppins-Medium';
      case 'regular':
        return 'Poppins-Regular';

      default:
        break;
    }
  };

  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textInputView}>
        {leftIcon && <View style={styles.leftIconView}>{leftIcon}</View>}

        <TextInput
          ref={inputRef}
          onChangeText={text => {
            setText(text);
            onChangeText(text);
          }}
          onKeyPress={onKeyPress}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          secureTextEntry={showPassword && password}
          value={value}
          style={[
            styles.textInput,
            {
              borderWidth: error ? 1 : 0,
              fontFamily: chooseFontFamily(fontFamily),
              paddingLeft: leftIcon ? 56 : 18,
              paddingRight: required || password ? 45 : 18,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={error ? Colors.RED : Colors.PLACEHOLDER}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          editable={editable}
          onFocus={onFocus}
        />
        {password && (
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.showPassTouch}
            onPress={() => {
              setShowPassword(!showPassword);
            }}>
            {showPassword ? <NotShowPass /> : <ShowPass />}
          </TouchableOpacity>
        )}

        {rightIcon && <TouchableOpacity
          activeOpacity={0.75}
          style={styles.showPassTouch}
          onPress={() => {
            rightIconComponent?.callback
          }}>
          {rightIconComponent?.component}
        </TouchableOpacity>}

        {required && (
          <View style={styles.star}>
            <CustomText
              text="*"
              color={error ? 'red' : 'placeholder'}
              size={11}
            />
          </View>
        )}
      </View>
      <View style={[styles.textView, { marginBottom: caption ? 0 : 0 }]}>
        {caption?.length != 0 && caption && (
          <CustomText
            text={caption}
            fontFamily="regular"
            color={error ? 'red' : 'placeholder'}
            size={11}
            style={styles.text}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 0,
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    height: scaleHeightSize(52),
    borderRadius: 20,
    borderColor: Colors.RED,
    color: Colors.BLACK,
    padding: 0,
  },
  text: {
    marginLeft: 8,
  },
  textInputView: {
    width: '100%',
    justifyContent: 'center',
  },
  showPassTouch: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 17,
  },
  textView: {
    width: '100%',
  },
  leftIconView: {
    position: 'absolute',
    zIndex: 1,
    left: 15,
  },
  star: {
    position: 'absolute',
    right: 17,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
