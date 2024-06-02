import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { eventApi } from "../../api/eventApi";
import { useNavigation } from "expo-router";
import images from "../../constants/images";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

const DMChatList = () => {
  const navigator = useNavigation();

  const dms = [
    {
        id: 1,
      image: `${images.dummyPic}`,
      name: "Florist-Bimal da",
    },
    {
        id: 2,
      image: `${images.dummyPic}`,
      name: "Koustav Roy",
    },
    {
        id:3,
      image: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
    },
  ];

  const handleChatPressed = ({ item }) => {
    navigator.navigate("DMChats", { name: item.name });
  };

  return (
    <SafeAreaView className="relative bg-white h-full">
      <View className="flex justify-center px-4">
        <View className="gap-[10px] mt-6">
          <View className="flex flex-row justify-between mt-8">
            <Image
              source={icons.ham}
              resizeMode="contain"
              className="w-[40px] h-[40px]"
            />
            <View className="flex flex-row gap-[3px]">
              <Image
                source={icons.search}
                resizeMode="contain"
                className="w-[45px] h-[45px]"
              />
              <Image
                source={images.dummyPic}
                resizeMode="contain"
                className="w-[45px] h-[45px]"
              />
            </View>
          </View>
          <View className="flex">
            <View className="mb-4 mt-5 flex flex-row justify-between">
              <View className="flex">
                <Text className='text-2xl font-bold'>Chats</Text>
                <View className="w-[59px] border-[2px] rounded-[3px] mb-3  border-[#FFAD65]"></View>
              </View>
              <TouchableOpacity onPress={() => navigator.goBack()}>
                <View className="py-2 px-4 bg-slate-200 rounded-md">
                  <Text className="text-slate-400">Back</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="h-[532px] py-2 px-1 flex bg-slate-100/[0.5]">
              {dms.map((item) => (
                <TouchableOpacity onPress={() => handleChatPressed({ item })} key={item.id}>
                  <View className="h-[56px] flex flex-row justify-between items-center px-2 bg-white mb-2 rounded-md shadow-sm">
                    <View className="flex flex-row items-center gap-[10px]">
                      <Image
                        source={item.image}
                        resizeMode="contain"
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <Text className="text-lg">{item.name}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-[10px]">
                      <Image
                        source={require("../../assets/icons/dmNotification.png")}
                        resizeMode="contain"
                        className="w-[28px] h-[28px]"
                      />
                      <Image
                        source={icons.menu}
                        resizeMode="contain"
                        className="w-[24px] h-[24px]"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DMChatList;
