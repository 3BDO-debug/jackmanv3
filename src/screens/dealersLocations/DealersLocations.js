import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSetRecoilState } from "recoil";
import Entypo from "@expo/vector-icons/Entypo";
// context
import { AxiosContext } from "../../context/AxiosContext";
// atoms
import selectedServiceAtom from "../../recoil/selectedService";
import popUpAlertAtom from "../../recoil/popUpAlert";
// mock data
import services from "../../mocks/serviceData";
// styles
import dealersLocationsStyles from "./DealersLocationsStyles";
import { Colors } from "../../constants/colors";
//
import DealerContainer from "../../components/DealerContainer";
import Screen from "../../components/Screen";
import CustomInput from "../../components/customInput";
import ServiceCard from "../../components/ServiceCard";
import { scale } from "react-native-size-matters";

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

const DealersLocations = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [dealers, setDealers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedDealers, setQueriedDealers] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const [selectedService, setSelectedService] =
    useRecoilState(selectedServiceAtom);

  const [filteredDealersByService, setFilteredDealersByService] = useState([]);

  const setPopUpAlert = useSetRecoilState(popUpAlertAtom);

  const fetchDealers = useCallback(async () => {
    setIsFetching(true);
    await authAxios
      .get("/manufacturer/getDealers?page=1&limit=100")
      .then((response) => {
        setDealers(response.data.result.data);
      })
      .catch((error) => {
        console.log("error fetching dealers", error.response);
        setPopUpAlert({
          visible: true,
          title: "No dealers",
          body: "We are sorry, there's no dealers at the moment.",
          popUpActionText: "okay",
          popUpActionHandler: () => false,
        });
      });
    setIsFetching(false);
  }, []);

  const onServicePressHandler = useCallback(
    (serviceId) => {
      if (selectedService && selectedService.id === serviceId) {
        setSelectedService(null);
      } else {
        const selectedServiceData = services.find(
          (service) => service.id === serviceId
        );
        setSelectedService(selectedServiceData);
      }
    },
    [selectedService, services]
  );

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  useEffect(() => {
    const filteredDealers =
      searchQuery.length === 0
        ? filteredDealersByService
        : filteredDealersByService.filter((dealer) =>
            dealer.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
    setQueriedDealers(filteredDealers);
  }, [searchQuery, setQueriedDealers, filteredDealersByService]);

  const renderDivider = (index) => {
    let renderDivider;
    if (filteredDealersByService.length % 3 === 0) {
      renderDivider = true;
    } else {
      if (index + 2 === filteredDealersByService.length) {
        renderDivider = false;
      } else if (index + 1 === filteredDealersByService.length) {
        renderDivider = false;
      } else if (index === filteredDealersByService.length) {
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

  const filterDealersBySelectedService = useCallback(() => {
    const mappedDealers = dealers?.filter((dealer) => {
      const dealerServices = dealer.services;

      for (let index = 0; index < dealerServices.length; index++) {
        const service = dealerServices[index];

        if (service.type === selectedService?.value) {
          return dealer;
        }
      }
    });

    setFilteredDealersByService(mappedDealers);
  }, [dealers, selectedService, setFilteredDealersByService]);

  useEffect(() => {
    if (selectedService) {
      filterDealersBySelectedService();
    } else {
      setFilteredDealersByService(dealers);
    }
  }, [selectedService, dealers]);

  return (
    <Screen navigation={navigation}>
      <View style={dealersLocationsStyles.wrapper}>
        {/* Filter tabs */}
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                cardData={{ ...service }}
                pressHandler={onServicePressHandler}
                selectedService={selectedService}
              />
            ))}
          </ScrollView>
        </View>
        {/* Title wrapper */}
        <View>
          <Text style={dealersLocationsStyles.title}>Dealer's Locations</Text>
        </View>
        {/* Search wrapper */}
        <View style={dealersLocationsStyles.searchWrapper}>
          <CustomInput
            placeholder="Search"
            onChangeText={(text) => {
              if (text.length < 25) {
                setSearchQuery(text);
              }
            }}
            value={searchQuery}
            rightIcon
            rightIconComponent={{
              component: renderSearchIcon(),
              callback: () => console.log("fs"),
            }}
          />
        </View>
        {/* No dealers text */}
        {!fetching && dealers && dealers.length === 0 && (
          <Instruction
            text="No dealers available, please come back later!"
            iconComponent={
              <FontAwesome5 name="sad-cry" size={30} color={Colors.WHITE} />
            }
          />
        )}

        {/* No search results */}

        {!fetching &&
          filteredDealersByService &&
          queriedDealers?.length === 0 && (
            <Instruction
              text={`No dealers matching your search result ''${searchQuery}'' `}
              iconComponent={
                <Entypo name="emoji-sad" size={40} color={Colors.GRAY} />
              }
            />
          )}

        {/* Dealers wrapper */}
        {fetching ? (
          <ActivityIndicator
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            size="large"
            color={Colors.BUTTON}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingBottom: 20,
              alignItems: "flex-end",
            }}
          >
            {queriedDealers?.map((dealer, index) => (
              <View style={{ width: "33.3%" }} key={index}>
                <DealerContainer
                  selectedDealer={dealer.id}
                  dealerData={{
                    id: dealer?.id,
                    title: dealer?.name,
                    image: dealer?.image,
                    location: dealer?.location,
                  }}
                  pressable
                  onPressCallback={() =>
                    navigation.navigate("DealerDetails", {
                      clickedFromDealersLocations: true,
                      dealerData: dealer,
                    })
                  }
                />
                {filteredDealersByService?.length > 3 && renderDivider(index) && (
                  <View
                    style={{
                      backgroundColor: Colors.GRAY,
                      height: 1,
                      marginVertical: 1,
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
    </Screen>
  );
};

export default DealersLocations;
