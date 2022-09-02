import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
// assets
import tutorial from "../assets/videos/tutorial.mp4";

// --------------------------------------------------------------------------------------

const TutorialVideo = () => {
  const [visible, setVisible] = React.useState(false);
  const video = React.useRef(null);

  const hideDialog = async () => {
    await AsyncStorage.setItem("tutorialIsWatched", "watched");
    setVisible(false);
  };

  const tutorialShouldShow = useCallback(async () => {
    const tutorialIsWatched = await AsyncStorage.getItem("tutorialIsWatched");
    if (tutorialIsWatched !== "watched") {
      setVisible(true);
    }
  }, [AsyncStorage]);

  useEffect(() => {
    tutorialShouldShow();
  }, [AsyncStorage]);

  return (
    <Portal>
      <Dialog
        style={{ borderRadius: 18 }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title>
          <Text style={styles.title}>How To Use Jackman</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <Text style={styles.bodyText}>
              Please watch this video on how to use the app to have the best
              experience. If you have any questions feel free to contact us
              directly.
            </Text>
            <Video
              ref={video}
              style={styles.video}
              source={tutorial}
              useNativeControls
              resizeMode="stretch"
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.actionWrapper}>
            <Button onPress={hideDialog}>Done</Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 19,
  },
  bodyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    marginBottom: 30,
  },
  video: {
    alignSelf: "flex-start",
    width: "100%",
    height: 200,
  },
  actionWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default TutorialVideo;
