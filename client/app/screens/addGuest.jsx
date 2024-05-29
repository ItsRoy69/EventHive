import { View, Text, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const AddGuest = () => {
  const [guestEmail, setGuestEmail] = useState(null);
  // console.log(guestEmail)

  const handleSendInvitation = async () => {
    // console.log("Email input state:", guestEmail);
    if (guestEmail.trim() === '') {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
   
   await axios.post('http://localhost:3500/guest/sendInvitation',{to:guestEmail}).then((res)=>{
    console.log(res)
   }).catch((err)=>{
    console.error(err)
   })
  };
  

  return (
    <SafeAreaView className='h-full'>
      <View className='mt-12 flex px-4'>
        <View className='flex items-center mb-6'>
          <Text className='text-2xl font-bold pt-2'>Add Guest</Text>
          <View className='border w-[120px] border-[2px] rounded-[3px] border-[#FFAD65]'></View>
        </View>
        <View className='mb-3'>
          <Text className='text-lg'>Enter the email</Text>
          <TextInput
            value={guestEmail}
            placeholder='abc@gmail.com'
            onChangeText={(text) => setGuestEmail(text)}
            className='border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md'
          />
        </View>
        <TouchableOpacity onPress={handleSendInvitation} >
          <View className='self-center rounded-md mt-3 flex bg-[#FFAD65] py-2 px-3'>
            <Text className='text-md'>Send Invitation</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddGuest;
