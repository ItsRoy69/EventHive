import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from '@react-navigation/native';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const BrideGroom = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const navigation = useNavigation();
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    navigation.navigate('RegisterName');
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
            Great, so who are you?
          </Text>
          <StyledView className="flex-col">
            <StyledTouchableOpacity
              className={`px-6 py-3 w-100 mb-2 rounded-md ${
                selectedAnswer === "The Bride" ? "bg-[#FFAD65]" : "bg-gray-200"
              }`}
              onPress={() => handleAnswerSelection("The Bride")}
            >
              <StyledText
                className={`text-lg font-bold text-center ${
                  selectedAnswer === "The Bride" ? "text-white" : "text-black"
                }`}
              >
                <StyledImage
                  source={require("../../assets/images/signup/bride-icon.png")}
                />
                The Bride
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              className={`px-6 py-3 w-100 mb-2 rounded-md ${
                selectedAnswer === "The Groom" ? "bg-[#FFAD65]" : "bg-gray-200"
              }`}
              onPress={() => handleAnswerSelection("The Groom")}
            >
              <StyledText
                className={`text-lg font-semibold  ${
                  selectedAnswer === "The Groom"
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                <StyledImage
                  source={require("../../assets/images/signup/groom-icon.png")}
                />
                The Groom
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          <StyledView className="mt-16 w-full px-4">
            <StyledImage
              source={require("../../assets/images/signup/bridegroom.png")}
              resizeMode="contain"
            />
          </StyledView>
        </View>
      </StyledView>
    </View>
  );
};

export default BrideGroom;
