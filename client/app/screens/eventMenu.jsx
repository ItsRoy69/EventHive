import React,{useState} from "react";
import { View, Text, Modal, Button, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "expo-router";
import AddGuest from "./addGuest";

const EventMenu = ({ menuOpen, setMenuOpen }) => {
  const navigation = useNavigation()
  const [addGuest,setAddGuest] = useState(false)
  

  const handleAddGuest = () =>{
    setAddGuest(true)
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={menuOpen}
      onRequestClose={() => setMenuOpen(false)}
    >
    {addGuest ? ( <AddGuest/>):(
      <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
        <View className="flex-1 justify-center items-center bg-black/[0.5]">
          <TouchableWithoutFeedback>
            <View className="w-[300px] items-center flex h-[310px] bg-white p-2 rounded-md">
              <Text className="mt-4 text-2xl font-sansserif">Event Menu</Text>
              <View className="border w-[120px] border-[2px] rounded-[3px] border-[#FFAD65]"></View>
              <TouchableOpacity onPress={handleAddGuest}>
                <View className="p-1 flex gap-[3px] flex-row w-[189px] items-center justify-center h-[40px] mt-8 bg-[#FFAD65] rounded-[8px] text-white">
                  <Image
                    source={require('../../assets/icons/addGuest.png')}
                    resizeMode="contain"
                    className="w-[24px] h-[24px]"
                  />
                  <Text className="text-white text-lg">Add Guest</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddGuest}>
                <View className="p-1 flex flex-row gap-[3px] w-[189px] items-center justify-center h-[40px] my-4 bg-[#A34342] rounded-[8px] text-white">
                  <Image
                    source={require('../../assets/icons/addVendor.png')}
                    resizeMode="contain"
                    className="w-[24px] h-[24px]"
                  />
                  <Text className="text-white text-lg">Add Vendor</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="p-1 flex gap-[3px] flex-row w-[189px] items-center justify-center h-[40px] my-1 bg-[#EFEFEF] rounded-[8px] text-white">
                  <Image
                    source={require('../../assets/icons/settings.png')}
                    resizeMode="contain"
                    className="w-[24px] h-[24px]"
                  />
                  <Text className="text-lg">Settings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    )}
     
    </Modal>
  );
};

export default EventMenu;
