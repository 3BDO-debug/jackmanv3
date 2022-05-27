import {
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";

// --------------------------------------------------------------------------------------

const Instruction = ({ text, iconComponent }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {iconComponent}
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Poppins-Bold",
          fontSize: 15,
          color: Colors.WHITE,
          marginTop: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

// -------------------------------------------------------------------------------------

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

  const renderDivider = (index) => {
    let renderDivider;
    if (dealers.length % 3 === 0) {
      renderDivider = true;
    } else {
      if (index + 2 === dealers.length) {
        renderDivider = false;
      } else if (index + 1 === dealers.length) {
        renderDivider = false;
      } else if (index === dealers.length) {
        renderDivider = false;
      } else {
        renderDivider = true;
      }
    }

    return renderDivider;
  };

  const renderSearchIcon = useCallback(() => {
    return searchQuery.length > 0 ? (
      <TouchableOpacity onPress={() => setSearchQuery("")}>
        <EvilIcons name="close-o" size={25} />
      </TouchableOpacity>
    ) : (
      <Feather name="search" size={20} />
    );
  }, [searchQuery]);

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
          value={searchQuery}
          rightIcon
          rightIconComponent={{
            component: renderSearchIcon(),
            callback: () => console.log("fs"),
          }}
        />
      </View>
      {/* No dealers text */}
      {!fetching && dealers.length === 0 && (
        <Instruction
          text="No dealers available, please come back later!"
          iconComponent={
            <FontAwesome5 name="sad-cry" size={30} color={Colors.WHITE} />
          }
        />
      )}

      {/* No search results */}

      {!fetching && queriedDealers.length === 0 && (
        <Instruction
          text={`No dealers matching your search result ''${searchQuery}'' `}
          iconComponent={
            <Entypo name="emoji-sad" size={40} color={Colors.GRAY} />
          }
        />
      )}

      {/* Dealers wrapper */}
      {fetching ? (
        <ActivityIndicator size="large" color={Colors.BUTTON} />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingBottom: 100,
          }}
        >
          {queriedDealers.map((dealer, index) => (
            <View style={{ width: "33.3%" }} key={index}>
              <DealerContainer
                dealerData={{
                  id: dealer?.id,
                  title: dealer?.name,
                  image: dealer?.image,
                  location: dealer?.location,
                }}
              />
              {dealers.length > 3 && renderDivider(index) && (
                <View
                  style={{
                    backgroundColor: Colors.GRAY,
                    height: 1,
                    marginVertical: 10,
                  }}
                ></View>
              )}
            </View>
          ))}
        </ScrollView>
        /*      <View style={{ flex: 1 }}>
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
        </View> */
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
