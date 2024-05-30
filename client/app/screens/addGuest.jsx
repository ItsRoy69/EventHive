import React, { useState } from "react";
import { View, Text, Modal, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import * as Linking from 'expo-linking';
import { useNavigation } from "expo-router";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed


const AddGuest = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const inviteLink = "https://example.com/invite";
  const openGmail = () => {
    console.log("Mail clicked")
    const email = 'example@gmail.com';
    const subject = "You are invited"
    const body = inviteLink
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle URL: " + mailtoUrl);
        } else {
          return Linking.openURL(mailtoUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  const openWhatsApp = () => {
    const message = 'Hello, this is a pre-filled message!';
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
  
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle URL: " + whatsappUrl);
        } else {
          return Linking.openURL(whatsappUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

 

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteLink);
    Alert.alert("Success","Copied to clipboard")
  };

  
  return (
    <TouchableWithoutFeedback>
      <View className="flex-1 justify-center items-center bg-black/[0.5]">
        <TouchableWithoutFeedback>
          <View className="w-[300px] items-center flex h-[310px] bg-white p-2 rounded-md">
            <Text className="mt-4 text-2xl font-sansserif">Send Invite</Text>
            <View className="border w-[120px] border-[2px] rounded-[3px] border-[#FFAD65]"></View>
            <View className='mt-12 flex items-center'>
              <Text>Copy that invite link:</Text>
              <View className="flex-row items-center mt-2  bg-slate-100 p-2 rounded-md">
                <Text className='font-bold text-slate-500'>{inviteLink}</Text>
                <TouchableOpacity  style={{ marginLeft: 10 }} onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={24} color="gray" />
                </TouchableOpacity>
              </View>
              <Text className='text-slate-700 mt-3'>or</Text>
              <View className='flex flex-row top-[12px] gap-[16px]'>
                <TouchableOpacity onPress={openGmail}>
                  <Image source = {require('../../assets/icons/mail.png')} resizeMode="contain" className='w-[24px] h-[24px]'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={openWhatsApp}>
                <Image source = {require('../../assets/icons/whatsapp.png')} resizeMode="contain" className='w-[24px] h-[24px]'/>
                 
                </TouchableOpacity>
                <TouchableOpacity >
                <Image source = {require('../../assets/icons/facebook.png')} resizeMode="contain" className='w-[24px] h-[24px]'/>
                 
                </TouchableOpacity>
                <TouchableOpacity >
                <Image source = {require('../../assets/icons/instagram.png')} resizeMode="contain" className='w-[24px] h-[24px]'/>
                 
                </TouchableOpacity>
                <TouchableOpacity >
                <Image source = {require('../../assets/icons/twitter.png')} resizeMode="contain" className='w-[24px] h-[24px]'/>
                 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddGuest;
