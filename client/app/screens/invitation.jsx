import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { useRef } from "react";
import React, { useState, useContext, useEffect } from "react";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { InvitationContext } from "../context/InvitationContext";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Invitation = () => {
  const navigation = useNavigation();
  const categories = ["All", "Not Sent", "Accepted", "Rejected", "Pending"];
  const [showPopup, setShowPopup] = useState(false);
  const popupAnimation = useRef(new Animated.Value(0)).current;
  const [category, setCategory] = useState("All");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);

  const { sendInvitation, setSendInvitation } = useContext(InvitationContext);

  const handleSelectPeople = (personId) => {
    const isSelected = selectedPeople.includes(personId);
    if (isSelected) {
      setSelectedPeople(selectedPeople.filter((id) => id !== personId));
    } else {
      setSelectedPeople([...selectedPeople, personId]);
    }
  };

  useEffect(() => {
    if (showPopup) {
      Animated.timing(popupAnimation, {
        toValue: -50,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(popupAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showPopup]);

  useEffect(() => {
    setButtonVisible(selectedPeople.length > 0);
  }, [selectedPeople]);
  const people = [
    {
      id: 1,
      dp: `${images.dummyPic}`,
      name: "Shreya Ganguly",
      status: "Accepted",
      date: "sent 10d ago",
    },
    {
      id: 2,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
    {
      id: 3,
      dp: `${images.dummyPic}`,
      name: "Rajarshi Dutta",
      status: "Rejected",
      date: "sent 18d ago",
    },
    {
      id: 4,
      dp: `${images.dummyPic}`,
      name: "Kaustav Da",
      status: "Pending",
      date: "sent 7d ago",
    },
    {
      id: 5,
      dp: `${images.dummyPic}`,
      name: "Mantu Meshomosai",
      status: "Accepted",
      date: "sent 10d ago",
    },
    {
      id: 6,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
    {
      id: 7,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
    {
      id: 8,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
    {
      id: 9,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
    {
      id: 10,
      dp: `${images.dummyPic}`,
      name: "Jyotirmoy Roy",
      status: "Not Sent",
      date: "sent 10d ago",
    },
  ];

  return (
    <SafeAreaView>
      
        <View className="mt-4  ">
          <View className="flex flex-row gap-[10px]">
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setCategory(item)}>
                <Text
                  className={`px-3 py-2 items-center ${
                    category === item ? "bg-[#FFAD65]/[0.41]" : "bg-[#F3F3F3]"
                  } rounded-[10px]`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView className="people-list bg-[#F3F3F3]/[0.5] px-0  flex flex-col mt-6 shadow-md "
           contentContainerStyle={{ justifyContent: "center" }} 
          >
            {people
              .filter(
                (person) => category === "All" || person.status === category
              )
              .map((person, index) => (
                <View
                  className="flex flex-row px-2 mb-2 items-center bg-white h-[54px] justify-between"
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => handleSelectPeople(person.id)}
                  >
                    <View className="flex flex-row items-center gap-[13px]">
                      {selectedPeople.includes(person.id) ? (
                        <Image
                          source={icons.right}
                          resizeMode="contain"
                          className="w-[35px] h-[35px]"
                        />
                      ) : (
                        <Image
                          source={person.dp}
                          resizeMode="contain"
                          className="w-[35px] h-[35px]"
                        />
                      )}

                      <View className="flex flex-col">
                        <Text className="text-lg">{person.name}</Text>
                        <Text className="text-md text-slate-400">
                          {person.date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {category === "All" && (
                    <>
                      <View>
                        {person.status === "Accepted" && (
                          <Image
                            source={icons.accepted}
                            resizeMode="contain"
                            className="w-[29px] h-[29px]"
                          />
                        )}
                        {(person.status === "Rejected" ||
                          person.status === "Not Sent") && (
                          <Image
                            source={icons.rejected}
                            resizeMode="contain"
                            className="w-[29px] h-[29px]"
                          />
                        )}
                        {person.status === "Pending" && (
                          <Image
                            source={icons.pending}
                            resizeMode="contain"
                            className="w-[29px] h-[29px]"
                          />
                        )}
                      </View>
                    </>
                  )}
                </View>
              ))}
          </ScrollView>
        </View>
      
      {buttonVisible && (
        <TouchableOpacity
          onPress={() => {
            setSendInvitation(true);
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              navigation.navigate("GuestInvite", {
                people: people.filter((p) => selectedPeople.includes(p.id)),
              });
            }, 1000);
          }}
          className="bg-[#FFAD65] py-2 px-4 rounded-xl flex items-center justify-center"
        >
          <Text className="text-white font-bold text-center text-lg">
            Send Invites
          </Text>
        </TouchableOpacity>
      )}
      {showPopup && (
        <Animated.View
          style={{ transform: [{ translateY: popupAnimation }] }}
          className="absolute bottom-20 left-0 right-0 justify-center items-center"
        >
          <View className="bg-white p-4 rounded-xl shadow-lg flex-row items-center">
            <EvilIcons
              name="envelope"
              size={26}
              color="green"
              style={{ marginRight: 8 }}
            />
            <Text className="text-center text-lg font-bold flex-row items-center">
              Invitations sent successfully
            </Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default Invitation;
