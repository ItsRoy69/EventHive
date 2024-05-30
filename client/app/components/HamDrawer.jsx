import { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, Image,TouchableOpacity } from 'react-native';
import { Easing } from 'react-native-reanimated';

const HamDrawer = ({ hamOpened, setHamOpened }) => {

  const drawerAnimation = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: hamOpened ? 0 : -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [hamOpened]);

  const HamDrawerComponent = () => {

    const eventList = [
      {
        title: "Rajarshi's Wedding",
        image: require('../../assets/images/eventImage.png'),
        date: 'May 9 - 13, 2024'
      },
      {
        title: "Jyoti's Wedding",
        image: require('../../assets/images/eventImage.png'),
        date: 'May 9 - 13, 2024'
      },
      {
        title: "Suman's Reception",
        image: require('../../assets/images/eventImage.png'),
        date: 'May 9 - 13, 2024'
      },
    ]

    return (
      <Animated.View
        style={{
          transform: [{ translateX: drawerAnimation }],
        }}
        className="absolute h-full w-full flex flex-col justify-start z-10"
      >
        <View
          className="relative top-4 left-2 w-4/5 h-full flex flex-col gap-2 bg-[#FFFDF7]"
        >
          <View
            className="-left-2 top-2 w-full bg-[#FFAD65]/[0.11] py-4 flex flex-row justify-center items-center gap-2"
          >
            <Image
              source={require('../../assets/images/signup/eventselectiontop.png')}
            ></Image>
            <View className="flex flex-row">
              <Text className="text-[#A34342] text-3xl font-bold">
                EVENT
              </Text>
              <Text className="text-[#1F2E2A] text-3xl font-bold">
                HIVE
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-center gap-2 px-2">
            {
              eventList.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="w-full flex flex-row justify-start items-center py-1 px-4 gap-2"
                  >
                    <Image
                      source={item.image}
                      className="h-12 w-12 rounded-sm"
                      resizeMode="contain"
                    ></Image>
                    <View className="flex flex-col">
                      <Text className="text-[#1F2E2A] text-lg font-bold truncate">
                        {item.title}
                      </Text>
                      <Text className="text-[#000000]/[0.49] text-base">
                        {item.date}
                      </Text>
                    </View>
                  </View>
                )
              })
            } 
          </View>
        </View>
        <TouchableOpacity
          className="absolute top-0 right-0 p-5 h-full  w-1/5 bg-[#F3F3F3] opacity-10"
          onPress={() => setHamOpened(!hamOpened)}
        ></TouchableOpacity>
      </Animated.View>
    );
  }
  return (
    <HamDrawerComponent />
  )
}

export default HamDrawer