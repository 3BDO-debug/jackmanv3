import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
// atoms
import carsAtom from "../../../recoil/cars";
// theme
import { Colors } from "../../../constants/colors";
// components
import CarCard from "../../carCard";
import ActionButton from "../../ActionButton";

// -----------------------------------------------------------------------

const UserCars = ({ navigation }) => {
  const cars = useRecoilValue(carsAtom);

  return (
    <View style={styles.wrapper}>
      {/* Cars wrapper */}
      {cars.length === 0 ? (
        <Text style={styles.noCarsText}>
          There's no cars, Please add some cars.
        </Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {cars.map((car, index) => (
            <View style={styles.carCardWrapper}>
              <CarCard
                key={index}
                item={car}
                onHistoryPress={() => {
                  navigation.navigate("CarHistory", { carId: car.id });
                }}
                onEditPress={() => {
                  navigation.navigate("EditCar", { carId: car.id });
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}
      {/* Action button */}
      <View style={styles.actionButtonWrapper}>
        <ActionButton
          icon={false}
          title="ADD NEW CAR"
          onPress={() => navigation.navigate("RegisterCar")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  noCarsText: {
    fontFamily: "Poppins-Medium",
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 12,
  },
  carCardWrapper: {
    marginBottom: 20,
  },
  actionButtonWrapper: {
    marginVertical: 40,
  },
});

export default UserCars;
