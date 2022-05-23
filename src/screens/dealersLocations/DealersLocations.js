import {
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
// context
import { AxiosContext } from "../../context/AxiosContext";
// styles
import dealersLocationsStyles from "./DealersLocationsStyles";
import CustomInput from "../../components/customInput";
//
import DealerContainer from "../../components/DealerContainer";
import { Colors } from "../../constants/colors";

const DealersLocations = () => {
  const { authAxios } = useContext(AxiosContext);
  const [dealers, setDealers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedDealers, setQueriedDealers] = useState([]);
  const [fetching, setIsFetching] = useState(false);

  const fetchDealers = useCallback(async () => {
    setIsFetching(true);
    await authAxios
      .get("/manufacturer/getDealers?page=1&limit=100")
      .then((response) => {
        setDealers(response.data.result.data);
      })
      .catch((error) => {
        console.log("error fetching dealers", error.response);
        Alert.alert("Opps!!, no dealers at the moment please try again.");
      });
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  useEffect(() => {
    const filteredDealers =
      searchQuery.length === 0
        ? dealers
        : dealers.filter((dealer) =>
            dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
    setQueriedDealers(filteredDealers);
  }, [searchQuery, setQueriedDealers, dealers]);

  return (
    <View style={dealersLocationsStyles.wrapper}>
      {/* Title wrapper */}
      <View>
        <Text style={dealersLocationsStyles.title}>Dealer's Locations</Text>
      </View>
      {/* Search wrapper */}
      <View style={dealersLocationsStyles.searchWrapper}>
        <CustomInput
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {/* Dealers wrapper */}
      {fetching ? (
        <ActivityIndicator size="large" color={Colors.BUTTON} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {queriedDealers.map((dealer, index) => (
              <View
                key={index}
                style={{ marginRight: 10, width: "25%", marginBottom: 25 }}
              >
                <DealerContainer
                  dealerData={{ title: dealer.name, image: dealer.image }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {/*  <View style={{ flex: 1 }}>
        <FlatList
          data={queriedDealers}
          numColumns={3}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
          renderItem={({ item }) => (
            <DealerContainer
              dealerData={{ title: item.name, image: item.image }}
            />
          )}
        />
      </View> */}
    </View>
  );
};

export default DealersLocations;
