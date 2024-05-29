import React from "react";
import Link from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledView className="flex-row w-full">
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

      <StyledView className="w-46 flex items-center justify-center mt-10">
        <StyledImage
          source={require("../../assets/images/signup/onboardinglogo.png")}
          className="h-18"
        />
      </StyledView>
      <StyledTouchableOpacity
        className="bg-[#FFAD65] rounded-md px-12 py-3 flex-row items-center"
        onPress={() => navigation.navigate("EventSelection")}
      >
        <StyledText className="text-white text-lg font-bold mr-2">
          Start Planning
        </StyledText>
        <Icon name="arrow-right" size={20} color="white" />
      </StyledTouchableOpacity>

      <StyledText className="text-black text-base">
        Have it setup already?{" "}
        <StyledText
          className="text-orange-800"
          onPress={() => navigation.navigate("SignIn")}
        >
          Login
        </StyledText>

      </StyledText>
      {/* <Link href='/events' className='text-blue-200 text-xl' >Go to events</Link> */}
      

      <StyledView className="mt-8 w-full px-4">
        <StyledImage
          source={require("../../assets/images/signup/onboardingimg.png")}
          className="w-full h-48"
          resizeMode="contain"
        />
      </StyledView>
    </StyledView>
  );
}