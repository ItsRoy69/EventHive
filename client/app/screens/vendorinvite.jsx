import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);
const StyledImage = styled(Image);

const VendorInvite = () => {
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
        <View className="flex items-center ">
          <StyledView className="w-46 flex items-center justify-center mt-10">
            <StyledImage
              source={require("../../assets/images/signup/eventselectiontop.png")}
              className="h-18"
            />
          </StyledView>
          <Text className="text-xl color-[#1F2E2A] font-bold mb-4">
            you are contracted for
          </Text>
          <StyledText className="text-center text-2xl font-bold border-b-4 border-b-[#FFAD65]">
            {" "}
            Rajarshi{" "}
            <StyledImage
              source={require("../../assets/images/invitation/and.png")}
              className="w-18"
            />{" "}
            Turna's{" "}
          </StyledText>
          <StyledText className="text-center text-lg font-bold mb-8">
            wedding
          </StyledText>
          <StyledView className="flex-col h-18 bg-[rgba(255, 173, 101, 0.17)] p-10 rounded-lg">
            <StyledView className="flex-col justify-center items-center mb-4">
              <StyledText className="text-2xl font-bold color-[#A34342]">
                Vendor Invitation
              </StyledText>
              <StyledImage
                source={require("../../assets/images/invitation/inviteline.png")}
                className="h-18"
              />
            </StyledView>

            <StyledView className="flex-row justify-center items-center mb-8">
              <StyledImage
                source={require("../../assets/images/invitation/vendorinvitepic.png")}
                className="h-18"
              />
            </StyledView>
            <StyledView className="flex-col h-32">
              <StyledButton className="flex-1 bg-[#A34342] mb-2 rounded-lg py-4">
                <StyledText className="text-center text-white font-bold">
                  Accept invite
                </StyledText>
              </StyledButton>
              <StyledButton className="flex-1 bg-gray-300 mb-2 rounded-lg py-4">
                <StyledText className="text-center text-gray-600 font-bold">
                  Reject invite
                </StyledText>
              </StyledButton>
            </StyledView>
          </StyledView>
        </View>
      </StyledView>
    </View>
  );
};

export default VendorInvite;
