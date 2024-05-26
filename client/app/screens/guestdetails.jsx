import React, { useState } from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledCheckBox = styled(CheckBox);

const GuestDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91");
  const [password, setPassword] = useState("");
  const [isHaldiAttending, setIsHaldiAttending] = useState(false);
  const [isWeddingAttending, setIsWeddingAttending] = useState(false);
  const [isReceptionAttending, setIsReceptionAttending] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center bg-white">
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
      <StyledView className="flex-1 items-center justify-center bg-white">
        <View className="flex items-center ">
          <StyledView className="w-46 flex items-center justify-center">
            <StyledImage
              source={require("../../assets/images/signup/eventselectiontop.png")}
              className="h-18"
            />
          </StyledView>
          <Text className="text-xl color-[#A34342] font-bold mb-4">
            Some final details....
          </Text>
          <StyledView className="w-46 flex items-left justify-left mt-[-10]">
            <StyledText className="mb-2">What should we call you?</StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Where should we reach out to you?
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="abc@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              And your contact number please
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="+91 1234567891"
              value={phone}
              onChangeText={setPhone}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Lastly, to secure your event
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 rounded px-4 py-2 mb-4 w-80"
              placeholder="enter a strong password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </StyledView>
          <StyledView className="w-80 flex items-left justify-left">
            <StyledText>Which days will you be attending?</StyledText>
            <StyledView className="items-center mt-[-10]">
              <StyledView className="flex-row justify-center mb-[-30]">
                <StyledView className="flex-row items-center">
                  <StyledCheckBox
                    checked={isHaldiAttending}
                    onPress={() => setIsHaldiAttending(!isHaldiAttending)}
                  />
                  <StyledText style={{ marginLeft: -15 }}>
                    {" "}
                    Haldi Ceremony{" "}
                  </StyledText>
                </StyledView>
                <StyledView className="flex-row items-center">
                  <StyledCheckBox
                    checked={isWeddingAttending}
                    onPress={() => setIsWeddingAttending(!isWeddingAttending)}
                  />
                  <StyledText style={{ marginLeft: -15 }}>
                    {" "}
                    Wedding Ceremony{" "}
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledView className="flex-row">
                <StyledView className="flex-row items-center">
                  <StyledCheckBox
                    checked={isReceptionAttending}
                    onPress={() =>
                      setIsReceptionAttending(!isReceptionAttending)
                    }
                  />
                  <StyledText style={{ marginLeft: -15 }}>
                    {" "}
                    Reception{" "}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          </StyledView>

          <StyledView className="w-80 flex items-left justify-left">
            <StyledText>What is your food preference?</StyledText>
            <StyledView className="items-center flex-row justify-left">
              <StyledView className="flex-row items-center justify-left">
                <StyledCheckBox
                  checked={isHaldiAttending}
                  onPress={() => setIsHaldiAttending(!isHaldiAttending)}
                />
                <StyledText style={{ marginLeft: -15 }}>
                  {" "}
                  Non-vegetarian{" "}
                </StyledText>
              </StyledView>
              <StyledView className="flex-row items-center">
                <StyledCheckBox
                  checked={isWeddingAttending}
                  onPress={() => setIsWeddingAttending(!isWeddingAttending)}
                />
                <StyledText style={{ marginLeft: -15 }}>
                  {" "}
                  Vegetarian{" "}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
          <StyledTouchableOpacity
            className="bg-[#FFAD65] w-64 rounded-md py-2"
            onPress={() => navigation.navigate("TabsLayout")}
          >
            <StyledText className="text-white text-center">
              Let the fun begin
            </StyledText>
          </StyledTouchableOpacity>
        </View>
      </StyledView>
    </View>
  );
};

export default GuestDetails;
