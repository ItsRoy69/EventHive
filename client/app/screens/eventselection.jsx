import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styled } from "nativewind";
const StyledView = styled(View);
const StyledImage = styled(Image);

import { CreateEventContext } from "../context/CreateEventContext";

const EventSelection = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const navigation = useNavigation();
  const {setEvent} = useContext(CreateEventContext) 

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
    setEvent(existingEvent => ({ ...existingEvent, type: event }));
    if (event === 'Wedding') {
      navigation.navigate('BrideGroom');
    } else {
      navigation.navigate('WorkingOn');
    }
  };

  const eventTypes = [
    "Wedding",
    "Marriage anniversary",
    "Farewell",
    "Funeral",
    "Freshers' Party",
    "Retirement function",
    "Birthday",
    "Other",
  ];

  return (
    <View className="flex-1 items-center bg-white">
      <StyledView className="flex-row w-full mt-8">
        <StyledImage
          source={require("../../assets/images/signup/onboardingtop.png")}
          className="flex-1 h-14"
          resizeMode="cover"
        />
        <StyledImage
          source={require("../../assets/images/signup/onboardingtop.png")}
          className="flex-1 h-14"
          resizeMode="cover"
        />
        <StyledImage
          source={require("../../assets/images/signup/onboardingtop.png")}
          className="flex-1 h-14"
          resizeMode="cover"
        />
      </StyledView>
      <View className="flex items-center mt-8">
        <StyledView className="w-46 flex items-center justify-center mt-10">
          <StyledImage
            source={require("../../assets/images/signup/eventselectiontop.png")}
            className="h-18"
          />
        </StyledView>
        <Text className="text-xl font-bold mb-4">
          What type of event it is?
        </Text>
        <View className="flex justify-center w-full">
          <View className="flex flex-row justify-evenly ">
            {eventTypes.slice(0, 2).map((event, index) => (
              <TouchableOpacity
                key={index}
                className={`px-2 py-1 m-2 rounded-lg ${
                  selectedEvent === event
                    ? "bg-[#FFAD65] text-white"
                    : "bg-gray-200"
                }`}
                onPress={() => handleEventSelection(event)}
              >
                <Text className="text-sm">{event}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex flex-row justify-evenly">
            {eventTypes.slice(2, 5).map((event, index) => (
              <TouchableOpacity
                key={index}
                className={`px-2 py-1 m-2 rounded-lg ${
                  selectedEvent === event
                    ? "bg-[#FFAD65] text-white"
                    : "bg-gray-200"
                }`}
                onPress={() => handleEventSelection(event)}
              >
                <Text className="text-sm">{event}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex flex-row justify-between">
            {eventTypes.slice(5, 9).map((event, index) => (
              <TouchableOpacity
                key={index}
                className={`px-2 py-1 m-2 rounded-lg ${
                  selectedEvent === event
                    ? "bg-[#FFAD65] text-white"
                    : "bg-gray-200"
                }`}
                onPress={() => handleEventSelection(event)}
              >
                <Text className="text-sm">{event}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventSelection;
