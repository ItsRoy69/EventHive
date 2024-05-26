import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "../../constants/icons";
import images from "../../constants/images";

const EventPlan = () => {
  const elements = [
    {
      id: 1,
      name: "Floor Plan",
      component: (
        <View className='h-[188px] border border-[#BEBEBE]'>
          
        </View>
      ), // Replace with actual component
    },
    {
      id: 2,
      name: "Venue Pictures",
      component: <Text>Venue Pictures Component</Text>, // Replace with actual component
    },
    {
      id: 3,
      name: "Event Vendors",
      component: <Text>Event Vendors Component</Text>, // Replace with actual component
    },
    {
      id: 4,
      name: "Food Menu",
      component: <Text>Food Menu Component</Text>, // Replace with actual component
    },
    {
      id: 5,
      name: "List of Invites",
      component: <Text>List of Invites Component</Text>, // Replace with actual component
    },
  ];
  const [selectedId, setSelectedId] = useState(1);

  const handlePress = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex justify-center px-4">
        <View className="gap-[24px]  mt-8">
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
          <View className="flex  flex-col">
            <View className="flex flex-row justify-between">
              <Text className="text-3xl font-semibold">Wedding Plan</Text>
            </View>
            <View className="border w-[158px] border-[4px] rounded-[3px]  border-[#FFAD65]"></View>
          </View>
          <View className="flex gap-[5px]">
            {elements.map((element) => (
              <View key={element.id}>
                <View
                  className={`bg-[#FFAD65]/[0.19] p-2 rounded-md ${
                    selectedId === element.id ? "" : "mb-2"
                  }`}
                >
                  <TouchableOpacity onPress={() => handlePress(element.id)}>
                    <View className="flex flex-row justify-between items-center">
                      <Text>{element.name}</Text>
                      <Image
                        source={
                          selectedId === element.id
                            ? icons.downArrow
                            : icons.sideArrow
                        }
                        resizeMode="contain"
                        className="w-5 h-5"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  {selectedId === element.id && element.component && (
                    <View className="mt-2 p-2 bg-white rounded-md">
                      {element.component}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventPlan;
