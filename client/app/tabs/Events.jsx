import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Invitation from "../screens/invitation";
import { InvitationProvider } from "../context/InvitationContext";
import EventMenu from "../screens/eventMenu";


const Events = () => {
  const navigator = useNavigation();
  const type = "host";
  const todo = [
    {
      name: "Meeting with Bimal Da - Florist",
      location: "Rajarhat",
      time: "10:30",
    },
    {
      name: "Venue visit and discussion",
      location: "Holiday Inn",
      time: "Chinar Park - 17:30",
    },
  ];

  const [reminders, setReminders] = useState(todo);

  const [expandedItem, setExpandedItem] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [sendInvitation, setSendInvitation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [invitationPressed, setInvitationPressed] = useState(false);
  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleInvitationPress = () => {
    setInvitationPressed(!invitationPressed);
  };

  const handleMenuPressed = () => {
    setMenuOpen(!menuOpen);
  };

  const parentItems = [
    {
      id: 1,
      image: `${images.dummyVenue}`,
      notification: 65,
      name: "Venue Decoration",
    },
    {
      id: 2,
      image: `${images.food}`,
      notification: 24,
      name: "Food and Catering",
    },
    {
      id: 3,
      image: `${images.dummyVenue}`,
      notification: 10,
      name: "Priest and Rituals",
    },
  ];
  const guestParentItem = [
    {
      id: 1,
      image: `${images.haldi}`,
      notification: 65,
      name: "Haldi Ceremony",
    },
    {
      id: 2,
      image: `${images.dummyVenue}`,
      notification: 65,
      name: "Wedding Ceremony",
    },
    {
      id: 3,
      image: `${images.dummyVenue}`,
      notification: 65,
      name: "Reception",
    },
  ];
  const subItems = {
    1: [
      {
        id: "1-1",
        image: `${icons.groupChat}`,
        notification: 60,
        data: "Group chat",
      },
      { id: "1-2", image: `${icons.florist}`, data: "Florist Bimal Da" },
      { id: "1-3", image: `${icons.venue}`, data: "Venue Decorator" },
      { id: "1-4", image: `${icons.florist}`, data: "Photographer" },
    ],
    2: [
      {
        id: "1-1",
        image: `${icons.groupChat}`,
        notification: 60,
        data: "Group chat",
      },
      { id: "1-2", image: `${icons.florist}`, data: "Florist Bimal Da" },
      { id: "1-3", image: `${icons.venue}`, data: "Venue Decorator" },
      { id: "1-4", image: `${icons.florist}`, data: "Photographer" },
    ],
    3: [
      {
        id: "1-1",
        image: `${icons.groupChat}`,
        notification: 60,
        data: "Group chat",
      },
      { id: "1-2", image: `${icons.florist}`, data: "Florist Bimal Da" },
      { id: "1-3", image: `${icons.venue}`, data: "Venue Decorator" },
      { id: "1-4", image: `${icons.florist}`, data: "Photographer" },
    ],
  };

  const handleSelectSubItem = ({ itemId }) => {
    setSelected(!selected);
    setSelectedSubItem(itemId);
  };

  const renderCommonItems = ({ itemId, itemName }) => {
    console.log("from events", itemName);
    return (
      <View className="flex">
        <TouchableOpacity
          onPress={() => navigator.navigate("GroupChats", { name: itemName })}
        >
          <View className="py-3 px-2 border-b-[0.5px] flex flex-row justify-between items-center border-gray-300">
            <View className="gap-[10px] flex flex-row items-center">
              <Image
                source={icons.groupChat}
                resizeMode="contain"
                className="w-[35px] h-[35px]"
              />
              <Text className="text-md font-semibold text-gray-700">
                Group Chat
              </Text>
            </View>
            <View className="px-[10px] py-1 bg-[#A34342] rounded-[15px]">
              <Text className="font-semibold text-white">60 +</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="py-3 px-2 border-b-[0.5px] flex flex-row justify-between items-center border-gray-300">
            <View className="gap-[10px] flex flex-row items-center">
              <Image
                source={icons.announcement}
                resizeMode="contain"
                className="w-[35px] h-[35px]"
              />
              <Text className="text-md font-semibold text-gray-700">
                Announcements
              </Text>
            </View>
            <View className="px-[10px] py-1 bg-[#A34342] rounded-[15px]">
              <Text className="font-semibold text-white">60 +</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="py-3 px-2 border-b-[0.5px] flex flex-row justify-between items-center border-gray-300">
            <View className="gap-[10px] flex flex-row items-center">
              <Image
                source={icons.gallery}
                resizeMode="contain"
                className="w-[35px] h-[35px]"
              />
              <Text className="text-md font-semibold text-gray-700">
                Gallery
              </Text>
            </View>
            <View className="px-[10px] py-1 bg-[#A34342] rounded-[15px]">
              <Text className="font-semibold text-white">60 +</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubItems = (itemId) => {
    return (
      <SectionList
        sections={[{ data: subItems[itemId] }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectSubItem({ itemId: item.id })}
          >
            <View className="py-3 px-2 border-b-[0.5px] flex flex-row justify-between items-center border-gray-300">
              <View className="gap-[10px] flex flex-row items-center">
                {selected && selectedSubItem === item.id ? (
                  <Image
                    source={icons.right}
                    resizeMode="contain"
                    className="w-[35px] h-[35px]"
                  />
                ) : (
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    className="w-[35px] h-[35px]"
                  />
                )}

                <Text className="text-md font-semibold text-gray-700">
                  {item.data}
                </Text>
              </View>
              {item.notification > 0 && (
                <View className="px-[10px] py-1 bg-[#A34342] rounded-[15px]">
                  <Text className="font-semibold text-white">
                    {item.notification} +
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const renderGuestItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        style={["py-4 border-b-[0.5px] border-gray-300 "]}
      >
        <View
          className={`flex py-3 px-2  ${
            expandedItem === item.id
              ? "bg-[#FFAD65]/[0.14]"
              : "bg-[#D9D9D9]/[0.1]"
          }   flex-row justify-between items-center`}
        >
          <View className="flex flex-row gap-[8px] items-center">
            <Image source={item.image} resizeMode="contain" />
            <Text className="text-lg font-semibold">{item.name}</Text>
          </View>
          <View className="flex flex-row">
            {item.notification > 0 && (
              <View className="px-[10px] py-1 bg-[#FFAD65]/[0.31] rounded-[50px]">
                <Text className="font-semibold">{item.notification} +</Text>
              </View>
            )}

            <Image source={icons.menu} className="h-6" resizeMode="contain" />
          </View>
        </View>
        {expandedItem === item.id &&
          renderCommonItems({ itemId: item.id, itemName: item.name })}
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <View className="">
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        style={["py-4 border-b-[0.5px] border-gray-300 "]}
      >
        <View
          className={`flex py-3 px-2  ${
            expandedItem === item.id
              ? "bg-[#FFAD65]/[0.14]"
              : "bg-[#D9D9D9]/[0.1]"
          }   flex-row justify-between items-center`}
        >
          <View className="flex flex-row gap-[8px] items-center">
            <Image source={item.image} resizeMode="contain" />
            <Text className="text-lg font-semibold">{item.name}</Text>
          </View>
          <View className="flex flex-row">
            {item.notification > 0 && (
              <View className="px-[10px] py-1 bg-[#FFAD65]/[0.31] rounded-[50px]">
                <Text className="font-semibold">{item.notification} +</Text>
              </View>
            )}

            <Image source={icons.menu} className="h-6" resizeMode="contain" />
          </View>
        </View>

        {expandedItem === item.id && renderSubItems(item.id)}
      </TouchableOpacity>
    </View>
  );

  const [ hamOpened, setHamOpened ] = useState(false);

  // const HamDrawerComponent = () => {
  //   return (
  //     <View className="fixed top-0 left-0 h-full w-4/5 border z-10 border-red-500">
  //       <Text>Ham</Text>
  //     </View>
  //   )
  // }
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
    
    return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: drawerAnimation,
        height: "100%",
        width: "80%",
        backgroundColor: "white",
        zIndex: 10,
        padding: 20,
        borderRightWidth: 1,
        borderColor: "gray",
      }}
    >
      <Text>Ham</Text>
    </Animated.View>
  );
}

  return (
      <SafeAreaView className="bg-white h-full">
        {hamOpened && <HamDrawerComponent />}
        <View className="flex justify-center px-4">
          <View className=" gap-[24px]  mt-8 ">
            <View className="flex flex-row justify-between mt-8 ">
              <TouchableOpacity onPress={() => {
                setHamOpened(!hamOpened);

              }}>
                <Image
                  source={icons.ham}
                  resizeMode="contain"
                  className="w-[40px] h-[40px]"
                  
                />
              </TouchableOpacity>
              {!selected ? (
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
              ) : (
                <View className="h-[42px] w-[140px] rounded-[8px] flex flex-row items-center justify-evenly py-2 bg-[#FFAD65]/[0.14]">
                <TouchableOpacity>
                  <Image
                    source={icons.userCross}
                    resizeMode="contain"
                    className="w-[24px] px-3 h-[24px]"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={icons.remove}
                    resizeMode="contain"
                    className="w-[24px] px-3 h-[24px]"
                  />
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <Image
                    source={icons.notification}
                    resizeMode="contain"
                    className="w-[22px] px-3 h-[22px]"
                  />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex  flex-col">
                <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center gap-[2px]">
                  <Text className="text-3xl font-semibold">
                    Rajarshi's Wedding
                  </Text>
                  {type === "host" && (
                    <TouchableOpacity onPress={handleMenuPressed}>
                      <View>
                        <Image
                          source={icons.downEvent}
                          resizeMode="contain"
                          className="w-[20px] h-[20px]"
                        />
                      </View>
                      {menuOpen && (
                        <EventMenu
                          setMenuOpen={setMenuOpen}
                          menuOpen={menuOpen}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
            
                </View>

                <View className="w-[216px] border-[4px] rounded-[3px]  border-[#FFAD65]"></View>
              </View>
              <TouchableOpacity
              onPress={handleInvitationPress}
              >
                <Image
                  source={icons.invite}
                  resizeMode="contain"
                  className="w-[42px] h-[35px]"
                />
              </TouchableOpacity>
            </View>
          </View>
          {!invitationPressed ? (
          <>
          <View className="reminders flex h-[165px] mt-1 mb-3">
            <Text className="text-sm text-slate-400">Reminders</Text>
            <View className="mt-1">
              {reminders.map((item, index) => (
                <View
                  className="bg-[#FFAD65]/[0.14] h-[58px] rounded-[8px]  flex flex-row border-l-8 border-[#FFAD65] justify-between items-center w-full px-3 mb-3 py-2"
                  key={index}
                >
                  <View className="flex  justify-start">
                    <Text className="text-black font-bold"> {item.name}</Text>

                    <View className="flex flex-row gap-[2px]">
                      <Text>{item.location}</Text>
                      <Text>-</Text>
                      <Text>{item.time}</Text>
                    </View>
                  </View>

                  <Image
                    source={icons.menu}
                    className="h-6"
                    resizeMode="contain"
                  />
                </View>
              ))}
            </View>
          </View>
          <View className="border-[0.5px] border-slate-400" />
          <View className="py-2 flex flex-row gap-[5px]">
            <View className="px-3 py-1  bg-slate-100 rounded-[10px] text-black">
              <Text>Unread</Text>
            </View>
            <View className="px-3 py-1  bg-slate-100 rounded-[10px] text-black">
              <Text>Calls</Text>
            </View>
            <View className="px-3 py-1  bg-slate-100 rounded-[10px] text-black">
              <Text>Groups</Text>
            </View>
          </View>

          <FlatList
            data={parentItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            className="mt-2"
          />
          </>
          ):(
            <InvitationProvider value={{sendInvitation,setSendInvitation}}>
              <Invitation/>
            </InvitationProvider>
          )}
        </View>
      </SafeAreaView>
  );
};

export default Events;
