import React from "react";
import HomeView from "./view";
import Screen from "../../components/Screen";

const Home = ({ route, navigation }) => {
  return (
    <Screen navigation={navigation}>
      <HomeView route={route} navigation={navigation} />
    </Screen>
  );
};

export default Home;
