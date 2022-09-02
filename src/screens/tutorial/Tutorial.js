import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Video } from "expo-av";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { scale } from "react-native-size-matters";
// atoms
import popUpAlertAtom from "../../recoil/popUpAlert";
import drawerAtom from "../../recoil/drawerAtom";
// theme
import { Colors } from "../../constants/colors";
// assets
import tutorial from "../../assets/videos/tutorial.mp4";
// components
import Screen from "../../components/Screen";
import ActionButton from "../../components/ActionButton";

// ------------------------------------------------------------------

const Tutorial = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);
  const drawerStatus = useRecoilValue(drawerAtom).drawerStatus;

  const useJackmanHandler = () => {
    navigation.navigate("Home");
    setPopUpAlert({
      visible: true,
      title: "How to use jackman",
      body: "Thanks for watching, if you found any trouble using the app you can return any time to the tutorial video. Also feel free to contact us directly.",
      popUpActionText: "Understood",
      popUpActionHandler: () => false,
    });
  };

  useEffect(() => {
    if (Boolean(video?.current)) {
      if (!status.isPlaying) {
        video?.current?.playAsync();
      }
    }
  }, []);

  useEffect(() => {
    if (drawerStatus === "opened") {
      video?.current?.pauseAsync();
    }
  }, [drawerStatus]);

  return (
    <Screen navigation={navigation}>
      <View style={styles.mainWrapper}>
        {/* Title wrapper */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>How To Use Jackman</Text>
        </View>
        {/* Video wrapper */}
        <View style={styles.videoWrapper}>
          <Video
            ref={video}
            style={styles.video}
            source={tutorial}
            useNativeControls
            resizeMode="stretch"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
        {/* Action button */}
        {/*  <View
          style={{ paddingTop: scale(Dimensions.get("window").height - 430) }}
        >
          <ActionButton
            onPress={useJackmanHandler}
            icon={false}
            title="use jackman"
          />
        </View> */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  titleWrapper: {
    marginTop: 30,
  },
  title: {
    fontFamily: "Poppins-Bold",
    color: Colors.WHITE,
    fontSize: 22,
  },
  videoWrapper: {
    flex: 1,
    marginTop: 20,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
    borderRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  actionButtonWrapper: {},
});

export default Tutorial;
