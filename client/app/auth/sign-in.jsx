import React, { useState } from 'react'

import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const SignIn = () => {
    
    const blankCreds = {
        email: '', 
        phone: '', 
        password: ''
    }
    const [creds, setCreds] = useState(blankCreds);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://eventhive-server.onrender.com/user/login", { phone: creds.phone, email: creds.email, password: creds.password });
            const result = response.data
            console.log(result.user)
            navigation.navigate("TabsLayout")
        } catch (error) {
            console.log(error.message)
            Alert.alert("Error", error.message)
        }
    }

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
            Enter your details....
          </Text>
          <StyledView className="w-46 flex items-left justify-left mt-10">
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Enter your contact number please 
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 px-4 py-2 mb-4 w-80"
              placeholder="+911234567891"
              value={creds.phone}
              onChangeText={(text) => setCreds({ ...creds, phone: text })}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Ener your password please
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 px-4 py-2 mb-4 w-80"
              placeholder="enter a strong password"
              value={creds.password}
              onChangeText={(text) => setCreds({ ...creds, password: text })}
              secureTextEntry
            />
          </StyledView>
          <StyledTouchableOpacity
            className="bg-[#FFAD65] w-64 rounded-md py-2"
            onPress={handleSubmit}
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
                Signin with Google
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex-row w-52 mb-2 justify-center bg-[#F1F1F1] rounded-md py-2">
              <StyledText>
                <StyledImage
                  source={require("../../assets/images/signup/facebookicon.png")}
                />{" "}
                Signin with Facebook
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </View>
      </StyledView>
    </View>
    )
}

export default SignIn