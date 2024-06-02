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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import Invitation from "../screens/invitation";
import { InvitationProvider } from "../context/InvitationContext";
import EventMenu from "../screens/eventMenu";
import HamDrawer from "../components/HamDrawer";
import { eventApi } from "../../api/eventApi";
import { channelApi } from "../../api/channelApi";
import { useGlobalContext } from "../context/GlobalProvider";

const Events = () => {
  const navigator = useNavigation();
  // const { user, event } = useContext(CreateEventContext);
  const { user, currentEvent } = useGlobalContext();
  const eventId = currentEvent._id;
  const token = user.token;

  const [reminders, setReminders] = useState(currentEvent.meetings);

  useEffect(() => {
    const handleGetMeetings = async () => {
      try {
        const response = await eventApi.getMeetings(eventId, token);
        // console.log("Meetings Fetched:",response.data)
        setReminders(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    handleGetMeetings();
  }, [reminders]);

  const [expandedItem, setExpandedItem] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [sendInvitation, setSendInvitation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [invitationPressed, setInvitationPressed] = useState(false);
  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const [avatar,setAvatars] = useState([
    `${images.haldi}`,`${images.food}`,`${images.priest}`
  ])
  const setChannelAvatar = (index) => {
    return avatar[index % 3]
  }

  const handleInvitationPress = () => {
    setInvitationPressed(!invitationPressed);
  };

  const handleMenuPressed = () => {
    setMenuOpen(!menuOpen);
  };

  const [channels, setChannels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleGetChannels = async () => {
      try {
        const response = await channelApi.getAllChannels(eventId, token);
        //  console.log("Data:",response.data.data[0])
        setData(response.data.data);
        setChannels(response.data.data[0].channels);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetChannels();
  }, []);
  // console.log("Channels",channels)
  const handleNavigateToChat = ({parentName,item}) => {
    console.log(item)
    if (selected && selectedSubItem === item._id) {
      setSelected(false);
      setSelectedSubItem(null);
      return;
    }
    if (item.category == "group"  ) {
      navigator.navigate("GroupChats", { name: item.name });
    } else {
      if(item.category == "gallery"){
        navigator.navigate("Gallery",{name : item.name})
      }
      navigator.navigate("DMChats", { name: item.user[0].name });
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString();
    const timeStr = dateObj.toLocaleTimeString();
    return `${timeStr}, ${dateStr}`;
  };

  const renderChannels = ({ item,parentName }) => {
    // console.log(item.avatar)
    // const link = item.avatar;
    return (
      <View className="flex">
        <TouchableOpacity
          onPress={() => handleNavigateToChat({parentName,item})}
          key={item._id}
        >
          <View className="py-3 px-2 border-b-[0.5px] flex flex-row justify-between items-center border-gray-300">
            <View className="gap-[15px] flex flex-row items-center">
              <View className="w-[24px] h-[24px] p-1 rounded-full bg-[#FFAD65]/[0.41]">
                <Image
                   source={item.category === 'vendor' ? images.dummyPic : { uri: `${item.avatar}` }}
                  resizeMode="contain"
                  className="w-full h-full "
                />
              </View>

              <Text className="text-md font-semibold text-gray-700">
                {item.name || (item.user && item.user[0] && item.user[0].name)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
                  <Text className="text-3xl font-semibold truncate w-4/5">
                    {currentEvent.name}
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
            <View
              className={`reminders ${
                remindersOpen ? "h-[180px]" : null
              }  flex py-2 mt-1`}
            >
              <ScrollView>
                <Text className="text-sm text-slate-400">Reminders</Text>
                {remindersOpen && (
                  <View className="mt-2">
                    {reminders.length > 0 ? (
                      reminders.map((item, index) => (
                        <View
                          className="bg-[#FFAD65]/[0.14] h-[58px] rounded-[8px] flex flex-row border-l-8 border-[#FFAD65] justify-between items-center w-full pl-4 mb-3 py-2"
                          key={index}
                        >
                          <View className="flex justify-start">
                            <Text className="text-black font-bold">
                              {item.subject}
                            </Text>

                            <View className="flex flex-row gap-[2px]">
                              <Text>{item.location}</Text>
                              <Text>-</Text>
                              <Text className="font-semibold">
                                {formatDate(item.datetime)}
                              </Text>
                            </View>
                          </View>

                          <Image
                            source={icons.menu}
                            className="h-6"
                            resizeMode="contain"
                          />
                        </View>
                      ))
                    ) : (
                      <View className="mt-2">
                        <Text className="text-black font-bold">
                          No upcoming reminders
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </ScrollView>
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
                onPress={() => navigator.navigate("DMChatList")}
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
            <View className="h-[205px] mt-4 px-2">
              {currentEvent.role === "host" ? (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View>
                      <View className="bg-[#FFAD65]/[0.14] rounded-md">
                        <TouchableOpacity
                          onPress={() => toggleExpand(item._id)}
                        >
                          <Text className="text-lg font-bold">{item.name}</Text>
                        </TouchableOpacity>
                      </View>

                      {expandedItem === item._id && (
                        <SectionList
                          sections={[
                            { title: "Channels", data: item.channels },
                          ]}
                          keyExtractor={(item) => item._id}
                          renderItem={renderChannels}
                          renderSectionHeader={({ section: { title } }) => (
                            <Text className="font-bold mt-2">{title}</Text>
                          )}
                        />
                      )}
                    </View>
                  )}
                />
              ) : (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item,index }) => (
                    <View>
                      <View className="bg-[#FFAD65]/[0.14] h-[56px] flex justify-between flex-row items-center px-2 rounded-md">
                        <TouchableOpacity
                          onPress={() => toggleExpand(item._id)}
                        >
                          <View className='flex flex-row gap-[7px]'>
                          <View className='w-[28px] h-[28px] rounded-md '>
                          <Image source={setChannelAvatar(index)}
                                  resizeMode="contain"
                                  className='w-full h-full'
                          />
                        </View>
                        <Text className="text-lg font-bold">{item.name}</Text>
                          </View>
                         
                        </TouchableOpacity>
                        
                      </View>
                      {expandedItem === item._id && (
                        <SectionList
                          sections={[
                            { title: "Channels", data: item.channels },
                          ]}
                          keyExtractor={(item) => item._id}
                          renderItem={renderChannels}
                          
                        />
                      )}
                    </View>
                  )}
                />
              )}
            </View>
            <TouchableOpacity
              className="rounded-md mt-5 flex items-center px-4 py-2 bg-[#FFAD65]/[0.8]"
              onPress={() => navigator.navigate("calendar")}
            >
              <Text className="text-white text-xl">+ Add / Event Channel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <InvitationProvider value={{ sendInvitation, setSendInvitation }}>
            <Invitation setInvitationPressed={setInvitationPressed} />
          </InvitationProvider>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Events;
