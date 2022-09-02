import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import NoLagTextInput from "react-native-no-lag-text-input";
import { logger } from "react-native-logs";
// atoms
import updateUserLocationAtom from "../../../recoil/userLocation";
import popUpAlertAtom from "../../../recoil/popUpAlert";
// stylesheets
import styles from "./ProfileSettingItemStyles";
import { ActivityIndicator } from "react-native-paper";
// theme
import { Colors } from "../../../constants/colors";
import { AxiosContext } from "../../../context/AxiosContext";

// -----------------------------------------------------------------------------------------------

var log = logger.createLogger();

const ProfileSettingItem = ({
  data,
  userDataUpdater,
  authenticatedUsingThirdParty,
  keyboardStatusState,
}) => {
  const { label, value, apiParam } = data;
  const [userInput, setUserInput] = useState(value);
  const [editMode, triggerEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const userInputRef = useRef();

  const navigation = useNavigation();
  const { authAxios } = useContext(AxiosContext);
  const [userLocation, setUserLocation] = useRecoilState(
    updateUserLocationAtom
  );

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);
  const [keyboardStatus, setKeyboardStatus] = useState(null);

  const handleUserInputChange = useCallback(
    (value) => {
      setUserInput(value);
    },
    [setUserInput]
  );

  /*  Update user info api call */

  const updateUserInfoRequestData = () => {
    let data;

    if (apiParam === "locationName") {
      data = {
        longitude: userLocation?.cords?.longitude,
        latitude: userLocation?.cords?.latitude,
        locationName: userLocation?.locationName,
      };
    } else {
      data = {
        [apiParam]: userInput,
      };
    }

    return data;
  };

  const updateUserInfoRequest = async () => {
    if (proceedUpdateRequest()) {
      setSaving(true);
      await authAxios
        .patch("/user/auth/update", updateUserInfoRequestData())
        .then(() => {
          if (apiParam === "locationName") {
            setUserLocation(null);
          }
          setPopUpAlert({
            visible: true,
            title: "Updated successfully",
            body: `Your ${label} info has been updated sucessfully`,
            popUpActionText: "okay",
            popUpActionHandler: () => false,
          });
        })
        .catch((error) => {
          if (error.response.data.responseCode === "UNAUTHORIZED") {
            setPopUpAlert({
              visible: true,
              title: "Email address already exists",
              body: "We are sorry, this email address already registered with us.",
              popUpActionText: "okay",
              popUpActionHandler: () => false,
            });
          } else {
            setPopUpAlert({
              visible: true,
              title: "Server error",
              body: "We are sorry, something wrong happened while trying to update your info.",
              popUpActionText: "okay",
              popUpActionHandler: () => false,
            });
          }

          console.log("Error updating user info", error.response.data);
        });
      await userDataUpdater();
      triggerEditMode(false);
      setSaving(false);
    }
  };

  const proceedUpdateRequest = () => {
    let proceed = false;

    if (apiParam === "name") {
      const nameSchema = /^[A-Za-z0-9]*[ ]?[A-Za-z]+[ ]?[A-Za-z0-9]*$/;
      if (nameSchema.test(userInput)) {
        proceed = true;
      } else {
        setPopUpAlert({
          visible: true,
          title: "Validation error",
          body: "Name is not valid",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      }
    } else if (apiParam === "email") {
      emailSchema =
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;
      if (emailSchema.test(userInput)) {
        proceed = true;
      } else {
        setPopUpAlert({
          visible: true,
          title: "Validation error",
          body: "Email address is not valid",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      }
    } else if (apiParam === "password") {
      passwordSchema = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (passwordSchema.test(userInput)) {
        proceed = true;
      } else {
        setPopUpAlert({
          visible: true,
          title: "Validation error",
          body: "Password is not valid",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      }
    } else if (apiParam === "locationName") {
      proceed = true;
    }

    return proceed;
  };

  const renderActionButtonText = () => {
    let context;

    console.log("eeeeee");

    if (editMode) {
      context = (
        <TouchableOpacity disabled={saving} onPress={updateUserInfoRequest}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
      );
    } else if (saving) {
      context = (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="small" color={Colors.BUTTON} />
        </View>
      );
    } else {
      context = <Text style={styles.actionButtonText}>Edit</Text>;
    }

    if (!userLocation && apiParam === "locationName" && editMode) {
      context = <Text style={styles.actionButtonText}>Edit</Text>;
    }

    return context;
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (keyboardStatus === "Keyboard Hidden") {
      if (editMode && apiParam !== "locationName") {
        updateUserInfoRequest();
        setKeyboardStatus(null);
      }
    }
  }, [keyboardStatus, updateUserInfoRequest]);

  return (
    <View style={styles.wrapper}>
      {/* Row container */}
      <View style={styles.rowContainer}>
        {/* Label and value container */}
        <View>
          {/* Label */}
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>{label}</Text>
          </View>
          {/* Value */}
          <View style={{ width: 170 }}>
            {editMode && apiParam !== "locationName" ? (
              <TextInput
                onChangeText={(text) => setUserInput(text)}
                value={userInput}
                style={styles.textInput}
                autoFocus
                maxLength={30}
                ref={userInputRef}
                nativeID={apiParam}
              />
            ) : (
              <Text
                style={[
                  styles.value,
                  { maxWidth: apiParam === "locationName" ? "90%" : "100%" },
                ]}
                numberOfLines={1}
              >
                {value}
              </Text>
            )}
          </View>
        </View>
        {/* Action button container */}
        <TouchableOpacity
          onPress={() => {
            if (authenticatedUsingThirdParty && apiParam === "email") {
              setPopUpAlert({
                visible: true,
                title: "Cannot proceed",
                body: "Sorry you can't edit your email since you are logged in using third party.",
                popUpActionText: "understood",
                popUpActionHandler: () => false,
              });
            } else if (
              authenticatedUsingThirdParty &&
              apiParam === "password"
            ) {
              setPopUpAlert({
                visible: true,
                title: "Cannot proceed",
                body: "Sorry you can't edit your password since you are logged in using third party.",
                popUpActionText: "understood",
                popUpActionHandler: () => false,
              });
            } else {
              triggerEditMode(!editMode);
            }

            if (apiParam === "locationName") {
              navigation.navigate("LocationMap");
            }
          }}
        >
          {renderActionButtonText()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileSettingItem;
