import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
// mocks
import {
  englishTermsAndConditions,
  arabicTermsAndConditions,
} from "../../mocks/termsAndConditions";
// stylesheets
import styles from "./TermsAndConditionsStyles";
// components
import ActionButton from "../../components/ActionButton";
import { Colors } from "../../constants/colors";
import { ActivityIndicator } from "react-native-paper";

// ----------------------------------------------------------------------------------------

const TermAndConditionItem = ({ text, isArabic }) => {
  return (
    <View style={styles.termAndConditionItemWrapper}>
      <Text
        style={
          isArabic
            ? styles.termAndConditionItemArabicText
            : styles.termAndConditionItemEnglishText
        }
      >
        - {text}
      </Text>
    </View>
  );
};

// ----------------------------------------------------------------------------------------

const TermsAndConditions = ({ route, navigation }) => {
  const [agreeing, setIsAgreeing] = useState(false);
  const [termsAndConditionsAgreed, setTermsAndConditionsAgreed] =
    useState(false);

  const onAgressPress = async () => {
    setIsAgreeing(true);
    await AsyncStorage.setItem("termsAndConditionsAgreed", "agreed");
    setTermsAndConditionsAgreed("agreed");
    if (Boolean(route?.params?.callbackFunction)) {
      try {
        route.params.callbackFunction();
      } catch (error) {
        console.log("Error call back the function", error);
        await AsyncStorage.removeItem("termsAndConditionsAgreed");
        navigation.navigate("LaunchingPage");
      }
    }

    setIsAgreeing(false);
  };

  const termsAndConditionsStatus = useCallback(async () => {
    const termsAndConditionsStatus = await AsyncStorage.getItem(
      "termsAndConditionsAgreed"
    );
    setTermsAndConditionsAgreed(termsAndConditionsStatus);
  }, [AsyncStorage]);

  useEffect(() => {
    termsAndConditionsStatus();
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        {/* Back action */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={20} color={Colors.WHITE} />
        </TouchableOpacity>
        {/* Logo wrapper */}
        <View style={styles.logoWrapper}>
          <Image source={require("../../assets/images/logo.png")} />
        </View>
        {/* Action button */}
        <View style={styles.actionButtonWrapper}>
          {termsAndConditionsAgreed !== "agreed" && (
            <>
              {agreeing ? (
                <View>
                  <ActivityIndicator size="small" color={Colors.BUTTON} />
                </View>
              ) : (
                <TouchableOpacity onPress={onAgressPress}>
                  <Text
                    style={{
                      color: Colors.BUTTON,
                      fontFamily: "Poppins-Bold",
                      fontSize: 14,
                    }}
                  >
                    Agree
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Terms and conditions</Text>
      </View>
      {/* English subtitle  */}
      <View style={styles.englishSubtitleWrapper}>
        <Text style={styles.englishSubtitle}>
          These terms are the terms and conditions governing the relationship
          between Jackman and the user:
        </Text>
      </View>
      {/* English terms and conditions */}
      <ScrollView
        contentContainerStyle={[styles.termsAndConditionsDataWrapper]}
      >
        {englishTermsAndConditions.map((termAndCondition, index) => (
          <TermAndConditionItem key={index} text={termAndCondition} />
        ))}
      </ScrollView>
      {/* Arabic subtitle */}
      <View style={styles.arabicSubtitleWrapper}>
        <Text style={styles.arabicSubtitle}>
          هذه البنود هي الشروط و الاحكام المنظمة بين للعلاقة بين المستخدم و
          جاكمان
        </Text>
      </View>

      {/* Arabic terms and conditions */}
      <ScrollView
        contentContainerStyle={[styles.termsAndConditionsDataWrapper]}
      >
        {arabicTermsAndConditions.map((termAndCondition, index) => (
          <TermAndConditionItem isArabic key={index} text={termAndCondition} />
        ))}
      </ScrollView>
      <View style={{ height: 10 }} />
    </View>
  );
};

export default TermsAndConditions;
