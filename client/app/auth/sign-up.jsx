import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { styled } from "nativewind";
import LoaderSpinner from "../components/LoaderSpinner";
import { useNavigation } from "@react-navigation/native";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

import axios from "axios";
import { useGlobalContext } from "../context/GlobalProvider";
import { CreateEventContext } from "../context/CreateEventContext";
import { userApi } from "../../api/userApi";
import { eventApi } from "../../api/eventApi";

const SignUp = () => {
  const [name, setName] = useState("");
  const [loading,setLoading] = useState(false)

  const blankCreds = {
    email: '', 
    phone: '', 
    password: ''
  }
  const [creds, setCreds] = useState(blankCreds);
  const navigation = useNavigation();
  const { user, event, setUser, setEvent, clearContextData } = useContext(CreateEventContext);

  const nameBuilder = (arr, type) => {
    let res = ""
    arr.map((name, index) => {
      if (index < arr.length - 1) {
        res += name + ' & ' 
      }
    })
    res += arr[arr.length - 1] + `'s ` + type
    return res 
  }

  const { user: user2, setUser: setUser2 } = useGlobalContext()

  const handleSubmit = async() => {
    setLoading(true)
    try {
      const userCreds = {
        name: user.name,
        phone: creds.phone,
        email: creds.email,
        password: creds.password
      }
      
      const response = await userApi.signup(userCreds)
      console.log("response: ", response.data)

      const eventData = {
        name: nameBuilder(event.names, event.type),
        datetime: {
          start: event.startDateTime,
          end: event.endDateTime
        }
      }

      setUser2(response.data.data)
      const response2 = await eventApi.createEvent(eventData, response.data.data.token)
      console.log("event created successfully: ", response2.data.data)

      clearContextData()
      setLoading(false)
      navigation.navigate("TabsLayout")
    } catch (error) {
      console.log(error)
      Alert.alert("Error", error.message)
    }
    
  }

  return (
    <View className="flex-1 items-center bg-white">
    {loading && (<LoaderSpinner text={"Loading.."}/>)}
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
              className="rounded-md bg-gray-100 border-b border-gray-300 px-4 py-2 mb-4 w-80"
              placeholder="abc@eventhive.com"
              value={creds.email}
              onChangeText={(text) => setCreds({ ...creds, email: text })}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              And your contact number please
            </StyledText>
            <StyledTextInput
              className="rounded-md bg-gray-100 border-b border-gray-300 px-4 py-2 mb-4 w-80"
              placeholder="+91 1234567891"
              value={creds.phone}
              onChangeText={(text) => setCreds({ ...creds, phone: text })}
            />
          </StyledView>
          <StyledView className="w-46 flex items-left justify-left">
            <StyledText className="mb-2">
              Lastly, to secure your event
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
