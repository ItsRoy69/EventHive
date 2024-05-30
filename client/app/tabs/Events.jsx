import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import icons from "../../constants/icons";
import images from "../../constants/images";
import Invitation from "../screens/invitation";
import { InvitationProvider } from "../context/InvitationContext";
import { CreateEventContext } from "../context/CreateEventContext";
import HamDrawer from "../components/HamDrawer";

const Events = () => {
  const navigation = useNavigation();
  const { user } = useContext(CreateEventContext);
  console.log("user form event:", user);

  const type = user.role === 'The Bride' || user.role === 'The Groom' ? 'host' : 'guest';

  const makeName = () => {
    const name = user.name;
    return name.endsWith('s') ? `${name}'` : `${name}'s`;
  };

  const [reminders, setReminders] = useState([
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
  ]);

  const [expandedItem, setExpandedItem] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [sendInvitation, setSendInvitation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [invitationPressed, setInvitationPressed] = useState(false);
  const [hamOpened, setHamOpened] = useState(false);
  const [remindersOpen, setRemindersOpen] = useState(true);

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleInvitationPress = () => {
    setInvitationPressed(!invitationPressed);
  };

  const handleNavigateToChat = (item) => {
    if (selected && selectedSubItem === item.id) {
      setSelected(false);
      setSelectedSubItem(null);
      return;
    }
    if (item.type === "group") {
      navigation.navigate("GroupChats", { name: item.data });
    } else {
      navigation.navigate("DMChats", { name: item.data });
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
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("GroupChats", { name: itemName })}
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
    const subItems = {
      1: [
        { id: "1-1", image: icons.groupChat, notification: 60, data: "Group chat", type: "group" },
        { id: "1-2", image: icons.florist, data: "Florist Bimal Da", type: "dm" },
        { id: "1-3", image: icons.venue, data: "Venue Decorator", type: "dm" },
        { id: "1-4", image: icons.florist, data: "Photographer", type: "dm" },
      ],
      2: [
        { id: "2-1", image: icons.groupChat, notification: 60, data: "Group chat", type: "group" },
        { id: "2-2", image: icons.florist, data: "Florist Bimal Da", type: "dm" },
        { id: "2-3", image: icons.venue, data: "Venue Decorator", type: "dm" },
        { id: "2-4", image: icons.florist, data: "Photographer", type: "dm" },
      ],
      3: [
        { id: "3-1", image: icons.groupChat, notification: 60, data: "Group chat", type: "group" },
        { id: "3-2", image: icons.florist, data: "Florist Bimal Da", type: "dm" },
        { id: "3-3", image: icons.venue, data: "Venue Decorator", type: "dm" },
        { id: "3-4", image: icons.florist, data: "Photographer", type: "dm" },
      ],
    };

    return (
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
                  <Text className="font-semibold text-white">{item.notification} +</Text>
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
      <TouchableOpacity onPress={() => toggleExpand(item.id)} style={["py-4 border-b-[0.5px] border-gray-300 "]}>
        <View
          className={`flex py-3 px-2 ${expandedItem === item.id ? "bg-[#E7D6FD]" : ""}`}
        >
          <Text className="text-md font-semibold text-gray-700">{item.name}</Text>
        </View>
      </TouchableOpacity>
      {expandedItem === item.id && (
        <View className="bg-[#F5EBFF]">
          {renderSubItems(item.id)}
        </View>
      )}
    </View>
  );

  const GuestItems = [
    { id: 1, name: "Bride Team" },
    { id: 2, name: "Groom Team" },
    { id: 3, name: "Family" },
  ];

  return (
    <SafeAreaView className="h-[100%] w-[100%]">
      <ScrollView className="flex flex-col gap-[30px]">
        <View className="relative bg-[#A34343] h-[150px]">
          <View className="flex flex-col justify-center items-center h-full">
            <Text className="text-[24px] font-bold text-white">Event Details</Text>
          </View>
          <TouchableOpacity
            onPress={() => setHamOpened(!hamOpened)}
            className="absolute top-[10px] left-[10px]"
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              className="w-[30px] h-[30px]"
            />
          </TouchableOpacity>
        </View>
        <View className="px-4">
          <Text className="text-2xl font-bold mb-2">{makeName()} Events</Text>
          {type === "host" && (
            <View className="flex flex-row justify-between items-center my-4">
              <TouchableOpacity
                onPress={handleInvitationPress}
                className="flex flex-row items-center bg-[#A34342] px-4 py-2 rounded-full"
              >
                <Image
                  source={icons.invitation}
                  resizeMode="contain"
                  className="w-[30px] h-[30px] mr-2"
                />
                <Text className="text-white font-semibold">Send Invitations</Text>
              </TouchableOpacity>
            </View>
          )}
          {type === "guest" && (
            <View className="mt-4">
              <Text className="text-lg font-semibold">My Reminders</Text>
              {reminders.map((reminder, index) => (
                <View
                  key={index}
                  className="py-3 px-4 border-b-[0.5px] border-gray-300"
                >
                  <Text className="text-md font-semibold">{reminder.name}</Text>
                  <Text className="text-gray-600">{reminder.location}</Text>
                  <Text className="text-gray-600">{reminder.time}</Text>
                </View>
              ))}
            </View>
          )}
          <FlatList
            data={GuestItems}
            renderItem={renderGuestItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        {sendInvitation && (
          <InvitationProvider>
            <Invitation />
          </InvitationProvider>
        )}
      </ScrollView>
      {hamOpened && <HamDrawer isOpen={hamOpened} onClose={() => setHamOpened(false)} />}
    </SafeAreaView>
  );
};

export default Events;
