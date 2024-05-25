import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const SignUp = () => {
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
            Some final details....
          </Text>
          <StyledView className="w-46 flex items-left justify-left mt-10">
            <StyledText className="mb-2">
              Where should we reach out to you?
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="abc@eventhive.com"
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              And your contact number please
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="+91 1234567891"
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Lastly, to secure your event
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="enter a strong password"
              secureTextEntry
            />
          </StyledView>
          <StyledTouchableOpacity
            className="bg-[#FFAD65] w-64 rounded-md py-2"
            onPress={() => navigation.navigate("SpouseName")}
          >
            <StyledText className="text-white text-center">
              Let the fun begin
            </StyledText>
          </StyledTouchableOpacity>
          <StyledText className="mb-4">or</StyledText>
          <StyledView className="flex-col">
            <StyledTouchableOpacity className="flex-row w-52 mb-2 justify-center bg-[#F1F1F1] rounded-md py-2">
              <StyledText>
                <StyledImage
                  source={require("../../assets/images/signup/googleicon.png")}
                />{" "}
                Signup with Google
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex-row w-52 mb-2 justify-center bg-[#F1F1F1] rounded-md py-2">
              <StyledText>
                <StyledImage
                  source={require("../../assets/images/signup/facebookicon.png")}
                />{" "}
                Signup with Facebook
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </View>
      </StyledView>
    </View>
  );
};

export default SignUp;
