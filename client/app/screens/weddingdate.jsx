import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import DateTimePicker from "@react-native-community/datetimepicker";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const WeddingDate = () => {
  const [weddingDate, setWeddingDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || weddingDate;
    setShowDatePicker(false);
    setWeddingDate(currentDate);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
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
      <StyledView className="flex-1 items-center justify-center bg-white">
        <View className="flex items-center mt-8">
          <StyledView className="w-46 flex items-center justify-center mt-10">
            <StyledImage
              source={require("../../assets/images/signup/eventselectiontop.png")}
              className="h-18"
            />
          </StyledView>
          <Text className="text-xl color-[#A34342] font-bold mb-4">
            When’s the wedding?
          </Text>
          <TouchableOpacity
            onPress={openDatePicker}
            className="w-64 border-b border-gray-300 px-4 py-2 mb-8 rounded-md bg-gray-100"
          >
            <Text>
              {weddingDate ? weddingDate.toDateString() : "Select date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={weddingDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <StyledTouchableOpacity className="bg-[#FFAD65] w-44 rounded-md py-2">
            <StyledText className="text-white text-center">Next</StyledText>
          </StyledTouchableOpacity>
        </View>
      </StyledView>
      <StyledView className="bottom-0 -translate-x-1/2 m-4">
        <StyledImage
          source={require("../../assets/images/signup/weddingdate.png")}
          className="w-34 h-34"
          resizeMode="contain"
        />
      </StyledView>
    </View>
  );
};

export default WeddingDate;
