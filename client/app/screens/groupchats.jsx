import React, { useState, useRef } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "expo-router";
import { styled } from "nativewind";
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRoute } from '@react-navigation/native';

const GroupChats = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const { name } = route.params || {};
  console.log(name)
  const [message, setMessage] = useState("");
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "John" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "Jane" },
    { id: 3, text: "I'm doing great!", sender: "John" },
  ]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "John",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <StyledView className="flex-1 bg-white">
      <StyledView
        className="flex-row pt-10 pb-3 px-1  items-center justify-between h-24 "
        style={{
          backgroundColor: "rgba(255, 173, 101, 0.14)",
        }}
      >
        <StyledView className="flex flex-row  items-center">
          <StyledView
            style={{
              backgroundColor: "rgba(255, 173, 101, 0.29)",
            }}
            className="flex-row items-center justify-center w-10 m-2 h-10 border-2 border-[#FFAD65] rounded-xl"
          >
            <FontAwesome6 name="arrow-left-long" size={16} color="#888" onPress={()=>navigation.goBack()} />
          </StyledView>
          <StyledView className="flex-col items-start justify-center">
            <StyledText className="text-lg font-bold text-[#1F2E2A]">
              {name || "Group Name"}
            </StyledText>
            
          </StyledView>
        </StyledView>
        <StyledView className="flex-row items-center">
          <StyledView className="m-2 mb-0">
            <Feather name="phone" size={20} color="#888" />
          </StyledView>
          <StyledView className="m-2 mb-0">
            <AntDesign name="adduser" size={20} color="#888" />
          </StyledView>
          <StyledView className="m-2 mb-0">
            <Entypo name="dots-three-vertical" size={20} color="#888" />
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledScrollView ref={scrollViewRef} className="flex-1 px-4 py-2">
          {messages.map((message) => (
            <StyledView
              key={message.id}
              className={`my-2 rounded-lg p-2 ${
                message.sender === "John"
                  ? "bg-[#FFAD65]/[0.41] self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              <StyledText
                className={`text-sm ${
                  message.sender === "John" ? "text-black" : "text-gray-800"
                }`}
              >
                {message.text}
              </StyledText>
            </StyledView>
          ))}
        </StyledScrollView>
        <StyledView
          className="flex-row items-center justify-between px-2 py-2"
          style={{ backgroundColor: "#F3F3F3" }}
        >
          <StyledView className="flex-row items-center justify-between bg-white rounded-lg">
            <StyledView className="flex-row items-center flex-1 rounded-full pl-4 p-2">
              <TouchableOpacity onPress={() => setShowEmojiKeyboard(!showEmojiKeyboard)}>
                <Entypo name="emoji-happy" size={20} color="#888" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 text-gray-800 ml-2"
                placeholder="Message..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={sendMessage}
              />
              {message.length === 0 && (
                <StyledView className="ml-auto">
                  <MaterialIcons
                    name="currency-exchange"
                    size={20}
                    color="#888"
                  />
                </StyledView>
              )}
            </StyledView>
            <StyledView className="m-2">
              <AntDesign name="paperclip" size={20} color="#888" />
            </StyledView>
            <StyledView className="mr-2">
              {message.length === 0 ? (
                <Feather name="mic" size={20} color="#888" />
              ) : (
                <Feather
                  name="send"
                  size={20}
                  color="#888"
                  onPress={sendMessage}
                />
              )}
            </StyledView>
          </StyledView>
        </StyledView>
        {showEmojiKeyboard && (
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setMessage(message + emoji);
              scrollToBottom();
            }}
            columns={8}
            showSearchBar={false}
            showTabs={false}
            showHistory={false}
            showSectionTitles={false}
            category={Categories.all}
          />
        )}
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default GroupChats;
