import { StyleSheet, View, Text, Keyboard } from "react-native";
import { Ionicons } from "react-native-vector-icons";
// react native paper
import {
  HelperText,
  TextInput as ReactNativeTextInput,
} from "react-native-paper";
// theme
import { Colors } from "../constants/colors";

// -------------------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: Colors.BLACK,
    height: 50,
    overflow: "hidden",
  },
});

function TextInput({
  placeholder,
  onChangeText,
  onBlur,
  value,
  keyboardType,
  secureTextEntry,
  nativeID,
  defaultIcon,
  icon,
  error,
  helperText,
  multiline,
  maxLength,
  defaultValue,
  numberOfLines,
  blurOnSubmit,
  onSubmitEditing,
}) {
  return (
    <View>
      <ReactNativeTextInput
        nativeID={nativeID}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        returnKeyType="done"
        onSubmitEditing={onSubmitEditing}
        clearButtonMode="while-editing"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        mode="flat"
        style={styles.textInputWrapper}
        right={
          !defaultIcon ? (
            <ReactNativeTextInput.Icon
              name={icon?.iconComponent}
              onPress={() => {}}
            />
          ) : (
            <ReactNativeTextInput.Icon
              color={icon?.iconColor}
              onPress={icon?.onPress}
              name={icon?.iconName}
            />
          )
        }
        activeUnderlineColor="transparent"
        selectionColor={Colors.BUTTON}
        multiline={multiline}
        onKeyPress={(e) => {
          if (e.nativeEvent.key == "Enter") {
            Keyboard.dismiss;
          }
        }}
        maxLength={multiline && maxLength}
        defaultValue={defaultValue}
        numberOfLines={numberOfLines}
      />
      {error && <HelperText type="error">{helperText}</HelperText>}
    </View>
  );
}

export default TextInput;
