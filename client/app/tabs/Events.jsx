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
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Image } from "react-native";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Invitation from "../screens/invitation";
import { InvitationProvider } from "../context/InvitationContext";
import EventMenu from "../screens/eventMenu";
import { CreateEventContext } from "../context/CreateEventContext";
import * as Keychain from 'react-native-keychain';

import HamDrawer from "../components/HamDrawer";

const Events = () => {
  const navigator = useNavigation();
  const { user, event } = useContext(CreateEventContext);

  // console.log("user form event:", user);
  

  useEffect (()=>{
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        Alert.alert("🔐 Here's your value 🔐 \n" + result);
      } else {
        Alert.alert('No values stored under that key.');
      }
    }
    getValueFor('jwt')
  },[])
  
  let type = "";
  if (user.role == "The Bride" || user.role == "The Groom") {
    type = "host";
  } else {
    type = "guest";
  }

  const makeName = () => {
    const name = user.name;
    if (name.endsWith("s")) {
      return `${name}'`;
    } else {
      return `${name}'s`;
    }
  };

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
      name: "Haldi Day",
    },
    {
      id: 2,
      image: `${images.food}`,
      notification: 24,
      name: "Wedding Day",
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
        id: "1-2",
        image: `${icons.florist}`,
        data: "Florist Bimal Da",
        type: "dm",
      },
      {
        id: "1-3",
        image: `${icons.venue}`,
        data: "Venue Decorator",
        type: "dm",
      },
      {
        id: "1-4",
        image: `${icons.florist}`,
        data: "Photographer",
        type: "dm",
      },
    ],
    2: [
      {
        id: "1-2",
        image: `${icons.florist}`,
        data: "Florist Bimal Da",
        type: "dm",
      },
      {
        id: "1-3",
        image: `${icons.venue}`,
        data: "Venue Decorator",
        type: "dm",
      },
      {
        id: "1-4",
        image: `${icons.florist}`,
        data: "Photographer",
        type: "dm",
      },
    ],
    3: [
      {
        id: "1-2",
        image: `${icons.florist}`,
        data: "Florist Bimal Da",
        type: "dm",
      },
      {
        id: "1-3",
        image: `${icons.venue}`,
        data: "Venue Decorator",
        type: "dm",
      },
      {
        id: "1-4",
        image: `${icons.florist}`,
        data: "Photographer",
        type: "dm",
      },
    ],
  };

  const handleNavigateToChat = (item) => {
    if (selected && selectedSubItem === item.id) {
      setSelected(false);
      setSelectedSubItem(null);
      return;
    }
    if (item.type == "group") {
      navigator.navigate("GroupChats", { name: item.data });
    } else {
      navigator.navigate("DMChats", { name: item.data });
    }
  };

  const handleSelectSubItem = (itemId) => {
    if (selected && selectedSubItem === itemId) {
      setSelected(false);
      setSelectedSubItem(null);
      return;
    }
    setSelected(true);
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

  const renderSubItems = ({ itemId, itemName }) => {
    return (
      <View>
        {renderCommonItems({ itemId: itemId, itemName: itemName })}
        <SectionList
          sections={[{ data: subItems[itemId] }]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToChat(item)}
              onLongPress={() => handleSelectSubItem(item.id)}
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
      </View>
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
          <View className="flex flex-row justify-between items-center gap-2">
            {item.notification > 0 && (
              <View className="px-2 bg-[#FFAD65]/[0.31] rounded-[50px]">
                <Text className="font-semibold">{item.notification} +</Text>
              </View>
            )}

            <Image
              source={icons.menu}
              className="h-6 w-8"
              resizeMode="contain"
            />
          </View>
        </View>

        {expandedItem === item.id &&
          renderSubItems({ itemId: item.id, itemName: item.name })}
      </TouchableOpacity>
    </View>
  );

  const [hamOpened, setHamOpened] = useState(false);

  const [remindersOpen, setRemindersOpen] = useState(true);

  return (
    <SafeAreaView className="relative bg-white h-full">
      {hamOpened && (
        <HamDrawer hamOpened={hamOpened} setHamOpened={setHamOpened} />
      )}
      <View className="flex justify-center px-4">
        <View className="gap-[24px] mt-8 ">
          <View className="flex flex-row justify-between mt-8 ">
            <TouchableOpacity
              onPress={() => {
                setHamOpened(!hamOpened);
              }}
            >
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
                <View className="flex items-center flex-row">
                  <Text className="text-3xl font-semibold">
                    {makeName()} Wedding
                  </Text>
                  <TouchableOpacity onPress={handleMenuPressed}>
                    <View className="flex self-center">
                      <Image
                        source={icons.downEvent}
                        resizeMode="contain"
                        className="w-[20px] h-[20px]"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {menuOpen && (
                <EventMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              )}

              <View className="w-[216px] border-[4px] rounded-[3px]  border-[#FFAD65]"></View>
            </View>
            <TouchableOpacity onPress={handleInvitationPress}>
              <Image
                source={icons.invite}
                resizeMode="contain"
                className="w-[42px] h-[35px]"
              />
            </TouchableOpacity>
          </View>
          <View className="border-[0.5px] border-slate-400" />
        </View>
        {!invitationPressed ? (
          <>
            <View className="reminders flex py-2 mt-1">
              <Text className="text-sm text-slate-400">Reminders</Text>
              {remindersOpen && (
                <View className="mt-2">
                  {reminders.map((item, index) => (
                    <View
                      className="bg-[#FFAD65]/[0.14] h-[58px] rounded-[8px] flex flex-row border-l-8 border-[#FFAD65] justify-between items-center w-full pl-4 mb-3 py-2"
                      key={index}
                    >
                      <View className="flex justify-start">
                        <Text className="text-black font-bold">
                          {item.name}
                        </Text>

                        <View className="flex flex-row gap-[2px]">
                          <Text>{item.location}</Text>
                          <Text>-</Text>
                          <Text className="font-semibold">{item.time}</Text>
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
              )}
            </View>
            <View className="relative border-[0.5px] h-0 my-5 border-slate-400">
              <TouchableOpacity
                className="absolute h-7 w-7 right-5 -bottom-[12px]"
                onPress={() => setRemindersOpen(!remindersOpen)}
              >
                <Image
                  className={`w-full h-full rounded-full ${
                    !remindersOpen && "rotate-180"
                  }`}
                  resizeMode="contain"
                  source={require("../../assets/icons/reminderShow.png")}
                />
              </TouchableOpacity>
            </View>
            <View className="py-2 flex flex-row gap-[5px]">
              <TouchableOpacity
                className="px-3 py-1  bg-slate-100 rounded-[10px] text-black"
                onPress={() => {}}
              >
                <Text>DMs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-1  bg-slate-100 rounded-[10px] text-black"
                onPress={() => {}}
              >
                <Text>Unread</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-1  bg-slate-100 rounded-[10px] text-black"
                onPress={() => {}}
              >
                <Text>Calls</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-1  bg-slate-100 rounded-[10px] text-black"
                onPress={() => {
                  navigator.navigate("GroupChats");
                }}
              >
                <Text>Groups</Text>
              </TouchableOpacity>
            </View>
            {type == "host" ? (
              <FlatList
                data={parentItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                className="mt-2"
              />
            ) : (
              <FlatList
                data={guestParentItem}
                renderItem={renderGuestItem}
                keyExtractor={(item) => item.id}
                className="mt-2"
              />
            )}
            <View className="rounded-md mt-5 flex items-center px-4 py-2 bg-[#FFAD65]/[0.8]">
              <Text className="text-white text-xl">+ Add Event Channel</Text>
            </View>
          </>
        ) : (
          <InvitationProvider value={{ sendInvitation, setSendInvitation }}>
            <Invitation />
          </InvitationProvider>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Events;
