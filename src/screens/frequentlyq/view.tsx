import React, { FC, useMemo, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import createStyles from "./styles";
import CustomText from "../../components/customText";
import FreqQuestion from "../../components/freqQuestion";

const FrequentlyqView: FC<FrequentlyqViewProps> = () => {
  const styles = useMemo(() => createStyles(), []);

  const [triggeredQuestion, setTriggeredQuestion] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.text}>
        <CustomText
          text={"Frequently Asked \n " + "Questions"}
          size={25}
          fontFamily="bold"
        />
      </View>
      <View style={styles.text2}>
        <CustomText
          text={"All your questions are answered here!"}
          size={12}
          fontFamily="regular"
          color="placeholder"
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          {
            id: 1,
            question: "How does my Jackman app work?",
            answer: `Users request/book service from the client app, and a mobile mechanic or auto technician, 
nearest to the destination, will arrive onsite or the customer can book the service required in the 
suppliers store.`,
            link: false,
          },
          {
            id: 2,
            question: "How do I pay for service?",
            answer: `Payments are made upon completion of the service. Some suppliers offer cash and card payments 
while others offer only cash payments. Currently, payments cannot be done through the app`,
            link: false,
          },
          {
            id: 3,
            question: "What service are offered by Jackman?",
            answer:
              "• Car maintenance\n" +
              "• Tires and batteries replacement \n" +
              "• Car care \n" +
              "• Car protection \n" +
              "• Oil change \n" +
              "N.B: not all services are offered now",
            link: false,
          },
          {
            id: 4,
            question: "How do I sign up to be a service provider with Jackman?",
            answer: `You may download the app and enroll through it or by contacting the Jackman’s customer 
service`,
            link: false,
          },
          {
            id: 5,
            question:
              "I’m having technical difficulties and/or need further assistance using the app?",
            answer: `You can contact the customer service through WhatsApp, phone call or through chat bot built-in 
within the app and they will direct you to the technical support team`,
            link: false,
          },
          {
            id: 6,
            question: "What is your website?",
            answer: `http://www.jackman-eg.com/`,
            link: true,
          },
          {
            id: 7,
            question: `Which repair type should I select?`,
            answer: `In cases where your vehicle's issues or diagnosis are unknown to you or are unavailable, you can 
choose to book a diagnostic service where you can describe your issue in more details during the 
booking process`,
            link: false,
          },
          {
            id: 8,
            question: `Do you do home pick-up?`,
            answer: `Jackman does not offer home pick up. However, in some cases we can arrange home pick-up and 
Jackman will not be held liable for anything that occurs to the vehicle`,
            link: false,
          },
        ]}
        renderItem={({ item }) => {
          return (
            <FreqQuestion
              item={item}
              triggeredQuestionState={[triggeredQuestion, setTriggeredQuestion]}
            />
          );
        }}
      />
    </ScrollView>
  );
};
export default FrequentlyqView;
