import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { InvitationContext } from "../context/InvitationContext";
import { useNavigation } from "@react-navigation/native";

const Invitation = () => {
  const navigation = useNavigation();
  const categories = ["All", "Not Sent", "Accepted", "Rejected", "Pending"];
  const [selected, setSelected] = useState(false);
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
      <View className="mt-4">
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
        <View className="people-list bg-[#F3F3F3]/[0.5]  px-0 justify-center flex flex-col mt-6 shadow-md ">
          {people
            .filter(
              (person) => category === "All" || person.status === category
            )
            .map((person, index) => (
              <View
                className="flex flex-row px-2 mb-2  items-center bg-white h-[54px] justify-between"
                key={index}
              >
                <TouchableOpacity onPress={() => handleSelectPeople(person.id)}>
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
        </View>
      </View>
      {buttonVisible && (
        <TouchableOpacity
          onPress={() => {
            setSendInvitation(true);
            navigation.navigate("GuestInvite", {
              people: people.filter((p) => selectedPeople.includes(p.id)),
            });
          }}
          className="bg-yellow-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-white font-bold">Send Invites</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Invitation;
