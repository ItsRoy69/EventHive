import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import { useNavigation } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalProvider";

const AddGuest = () => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const { user, currentEvent } = useGlobalContext();
  const openGmail = () => {
    console.log("Mail clicked");
    const email = "example@gmail.com";
    const subject = "You are invited";
    const body = inviteLink;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle URL: " + mailtoUrl);
        } else {
          return Linking.openURL(mailtoUrl);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const openWhatsApp = () => {
    const message = "Hello, this is a pre-filled message!";
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle URL: " + whatsappUrl);
        } else {
          return Linking.openURL(whatsappUrl);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteLink);
    
  };

  useEffect(() => {
    if (user && currentEvent) {
      generateInviteLink();
    }
  }, [user, currentEvent]);

  const generateInviteLink = async () => {
    try {
      const eventId = currentEvent._id;
      const hostId = user._id;
      const token = user.token;

      const response = await axios.post(
        "https://eventhive-server.onrender.com/invite",
        {
          eventId,
          role: "host",
          hostId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;
      setInviteLink(data.inviteLink);
    } catch (error) {
      console.error("Error generating invite link:", error);
      Alert.alert("Error", "Failed to generate invite link");
    }

    


  };

  return (
    <TouchableWithoutFeedback>
      <View className="flex-1 justify-center items-center bg-black/[0.5]">
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('TabsLayout')} >
          <View className='w-[300px] h-[310px] bg-white p-2 rounded-md'>
          <TouchableOpacity >
              <View className='flex self-start pl-3 mt-2'>
                <Image
                  source={require("../../assets/icons/backArrow.png")}
                  resizeMode="contain"
                  className="w-[24px] h-[24px]"
                />
              </View>
            </TouchableOpacity>
           
            <View className="flex items-center">
           
              <Text className="mt-2 text-2xl flex self-center font-sansserif">Send Invite</Text>
              <View className="w-[120px] flex self-center border-[2px] rounded-[3px] border-[#FFAD65]"></View>
              <View className="mt-12  flex items-center">
                <Text>Copy that invite link:</Text>
                <View className="flex-row items-center  mx-3 px-2  mt-2  overflow-y-auto  bg-slate-100 py-2  rounded-md">
                  <Text className="font-bold w-[2/5] text-slate-500">{inviteLink}</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={copyToClipboard}
                  >
                    <Ionicons name="copy-outline" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text className="text-slate-700 mt-3">or</Text>
                <View className="flex flex-row top-[12px] gap-[16px]">
                  <TouchableOpacity onPress={openGmail}>
                    <Image
                      source={require("../../assets/icons/mail.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openWhatsApp}>
                    <Image
                      source={require("../../assets/icons/whatsapp.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/icons/facebook.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/icons/instagram.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/icons/twitter.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddGuest;
