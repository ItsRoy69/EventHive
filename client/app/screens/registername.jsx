import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const RegisterName = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();
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
            What should we call you?
          </Text>
          <StyledTextInput
            className="w-64 border-b border-gray-300 px-4 py-2 mb-8 rounded-md bg-gray-100"
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
          />
          <StyledTouchableOpacity
            className="bg-[#FFAD65] w-44 rounded-md py-2"
            onPress={() => navigation.navigate("SpouseName")}
          >
            <StyledText className="text-white text-center">Next</StyledText>
          </StyledTouchableOpacity>
        </View>
      </StyledView>
      <StyledView className="bottom-0 -translate-x-1/2 m-4">
        <StyledImage
          source={require("../../assets/images/signup/registername.png")}
          className="w-34 h-34"
          resizeMode="contain"
        />
      </StyledView>
    </View>
  );
};

export default RegisterName;
