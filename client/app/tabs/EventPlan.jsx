import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import icons from "../../constants/icons";
import images from "../../constants/images";
import {
  Verandah,
  Room,
  SofaSeating,
  TableArea,
  Stage,
  Entrance,
} from "../components/FloorComponents";
import DraggableResizableComponent from '../components/DraggableResizableComponent';
import HamDrawer from "../components/HamDrawer";

const EventPlan = () => {
  const [showPreference, setShowPreference] = useState(false);
  const [floor, setFloor] = useState("Floor 1");
  const [selectedChair, setSelectedChair] = useState(false);

  const handleCheckBox = () => {
    setShowPreference(!showPreference);
  };
  const type ='guest'

  const invitees = [
    {
      id: 1,
      name: "Shreya Ganguly",
      food_preference: "Non-veg",
      image: `${images.dummyVenue}`,
    },
    {
      id: 2,
      name: "Jyotirmoy Roy",
      food_preference: "Non-veg",
      image: `${images.dummyVenue}`,
    },
    {
      id: 3,
      name: "Koustav Roy",
      food_preference: "Veg",
      image: `${images.dummyVenue}`,
    },
  ];

  const vendors = [
    {
      id: 1,
      name: "Florist - Bimal Da",
      image: `${images.dummyVenue}`,
      call: true,
    },
    {
      id: 2,
      name: "Venue Decorator",
      image: `${images.dummyVenue}`,
    },
    {
      id: 3,
      name: "Caterer",
      image: `${images.dummyVenue}`,
    },
    {
      id: 4,
      name: "Photographer",
      image: `${images.dummyVenue}`,
    },
  ];

  const floorPlans = {
    "Floor 1": (
      <View className="border-2 h-[200px] flex border-[#BEBEBE] bg-[#ECECE]">
        <View className="flex flex-row">
          <DraggableResizableComponent><Verandah /></DraggableResizableComponent>
          <DraggableResizableComponent><Room name="Room for bride" /></DraggableResizableComponent>
        </View>

        <View className="flex items-center h-[40px] relative left-[-10px] top-[-29px]">
          <DraggableResizableComponent><Stage /></DraggableResizableComponent>
        </View>
        <View className="flex ">
          <View className=" h-[55px]  relative top-[-78px]">
            <DraggableResizableComponent><Room name="Room for bride" /></DraggableResizableComponent>
          </View>
          <View className=" h-[45px] w-[100px]  relative top-[-72px]">
            <DraggableResizableComponent><Room name="Drinks and snacks" /></DraggableResizableComponent>
          </View>
          <View className=" h-[32px] w-[55px] mt-3  relative top-[-72px]">
            <DraggableResizableComponent><Entrance /></DraggableResizableComponent>
          </View>
        </View>

        <TouchableOpacity onPress={() => setSelectedChair(!selectedChair)}>
          <View className="items-center relative top-[-150px] mt-1 h-[74px] flex justify-center">
            <DraggableResizableComponent><TableArea /></DraggableResizableComponent>
          </View>
        </TouchableOpacity>
      </View>
    ),
    "Floor 2": (
      <View className="border-2 h-[200px] border-[#BEBEBE] bg-[#ECECE]">
        <View className="flex flex-row">
          <DraggableResizableComponent><Room name="Room for groom" /></DraggableResizableComponent>
          <DraggableResizableComponent><SofaSeating /></DraggableResizableComponent>
        </View>
        <View className="flex flex-row ">
          <DraggableResizableComponent><TableArea /></DraggableResizableComponent>
          <DraggableResizableComponent><Entrance /></DraggableResizableComponent>
        </View>
      </View>
    ),
    "Floor 3": (
      <View className="border-2 h-[200px] border-[#BEBEBE] bg-[#ECECE]">
        <View className="flex flex-row">
          <DraggableResizableComponent><Room name="VIP Room" /></DraggableResizableComponent>
          <DraggableResizableComponent><TableArea /></DraggableResizableComponent>
        </View>
        <View className="flex flex-row ">
          <DraggableResizableComponent><Entrance /></DraggableResizableComponent>
          <DraggableResizableComponent><SofaSeating /></DraggableResizableComponent>
        </View>
      </View>
    ),
  };

  const renderInvitees = ({ item }) => (
    <View className="flex flex-row justify-between  p-2 py-2 border-b-[0.5px] border-gray-300 ">
      <View className="flex flex-row items-center gap-[5px]">
        <Image
          source={item.image}
          resizeMode="contain"
          className="w-[28px] h-[28px]"
        />
        <View>
          <Text className="text-md">{item.name}</Text>
        </View>
        {showPreference && (
          <View>
            <Image
              source={
                item.food_preference === "Non-veg" ? icons.nonveg : icons.veg
              }
              resizeMode="contain"
              className="w-[10px] h-[10px]"
            />
          </View>
        )}
      </View>
      <View className="flex items-center ">
        <Image
          source={icons.messagePhone}
          resizeMode="contain"
          className="w-[66px] h-[18px]"
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View className="flex items-center flex-row justify-between p-2 py-2 border-b-[0.5px] border-gray-300 ">
      <View className="flex items-center flex-row gap-[7px]">
        <Image
          source={item.image}
          resizeMode="contain"
          className="w-[28px] h-[28px]"
        />
        <View>
          <Text className="text-md flex  ">{item.name}</Text>
        </View>
      </View>
      {item.call && (
        <View className="bg-[#A34342] flex justify-center items-center rounded-md p-2 w-[29px] h-[18px]">
          <Image
            source={icons.phone}
            resizeMode="contain"
            className="w-[15px] h-[15px]"
          />
        </View>
      )}
    </View>
  );
  const [numberOfChair,setNumberOfChair] = useState(0)
  const handleAddChair = ()=>{
    setNumberOfChair(numberOfChair + 1)
  }
  const handleDeleteChair = ()=>{
    setNumberOfChair(numberOfChair - 1 )
  }
  const elements = [
    {
      id: 1,
      name: "Floor Plan",
      component: (
        <View className="flex">
          <View className="flex mb-2 flex-row justify-between">
            <View className="flex mt-2 pl-2">
              <Text className="font-bold text-md">Venue</Text>
              <Text>Hotel Holiday Inn - Chinar Park</Text>
            </View>
            <View className="bg-[#FFD9B7] items-center justify-center mt-2 flex  rounded-md">
              <Picker
                selectedValue={floor}
                style={{ height: 30, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setFloor(itemValue)}
              >
                <Picker.Item label="Floor 1" value="Floor 1" />
                <Picker.Item label="Floor 2" value="Floor 2" />
                <Picker.Item label="Floor 3" value="Floor 3" />
              </Picker>
            </View>
          </View>
          {floorPlans[floor]}
          <View className="mt-2">
            {selectedChair && (
              <View className="flex">
                <View className="bg-[#FFAD65]/[0.19] h-[40px] justify-center  p-2 rounded-md">
                  <Text className="font-bold">
                    How do you want this area decorated ?
                  </Text>
                </View>
                <View className="flex px-2 py-2 flex-row bg-[#B4B5B5]/[0.1] justify-between">
                  <Text className="text-lg">Round table and Chairs</Text>
                  <View className="flex flex-row gap-[2px]">
                    <TouchableOpacity onPress={handleDeleteChair}>
                    <Image
                      source={require("../../assets/icons/minus.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                    </TouchableOpacity>
                    <View className="w-[48px] flex justify-center items-center bg-white">
                      <Text>{numberOfChair}</Text>
                    </View>
                    <TouchableOpacity onPress={handleAddChair}>
                    <Image
                      source={require("../../assets/icons/plus.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex px-2 py-2 flex-row bg-[#B4B5B5]/[0.1] justify-between">
                  <Text className="text-lg">Row of Chairs</Text>
                  <View className="flex flex-row gap-[2px]">
                    <Image
                      source={require("../../assets/icons/minus.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                    <View className="w-[48px] flex justify-center items-center bg-white">
                      <Text>0</Text>
                    </View>
                    <Image
                      source={require("../../assets/icons/plus.png")}
                      resizeMode="contain"
                      className="w-[24px] h-[24px]"
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      ),
    },
    {
      id: 2,
      name: "Venue Pictures",
      component: (
        <View>
          <View className="bg-[#F3F3F3] p-4 justify-between flex flex-row">
            <View className="flex justify-start">
              <Image
                source={images.venue_1}
                resizeMode="contain"
                className="w-[130px] h-[130px]"
              />
            </View>
            <View className="flex flex-col">
              <Image
                source={images.venue_2}
                resizeMode="contain"
                className="w-[178px] h-[39px] mb-2"
              />
              <View className="flex flex-row gap-[7px]">
                <Image
                  source={images.venue_3}
                  resizeMode="contain"
                  className="w-[39px] h-[39px]"
                />
                <Image
                  source={images.venue_4}
                  resizeMode="contain"
                  className="w-[39px] h-[39px]"
                />
                <Image
                  source={images.venue_5}
                  resizeMode="contain"
                  className="w-[39px] h-[39px]"
                />
                <View>
                  <Image
                    source={images.venue_360}
                    resizeMode="contain"
                    className="w-[39px] h-[39px]"
                  />
                  <Image
                    source={images.angle}
                    resizeMode="contain"
                    className="absolute w-[24px] h-[30px] self-center flex items-center top-[5px]"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ),
    },
   
    {
      id: 3,
      name: "Event Vendors",
      component: (
        <FlatList
          data={vendors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          className="mt-2"
        />
      ),
    },
    {
      id: 4,
      name: "Food Menu",
      component: (
        <View className="py-2 px-6 flex flex-row items-center justify-between bg-[#F3F3F3]">
          <Image
            source={images.foodMenu}
            resizeMode="contain"
            className="w-[110px] h-[159px]"
          />
          <Image
            source={images.foodMenu}
            resizeMode="contain"
            className="w-[110px] h-[159px]"
          />
        </View>
      ),
    },
    {
      id: 5,
      name: "List of Invites",
      component: (
        <View className="flex mt-2">
          <TouchableOpacity onPress={handleCheckBox}>
            <View className="bg-[#F3F3F3] items-center py-2 flex flex-row px-2">
              {!showPreference ? (
                <View className="w-[12px] h-[12px] rounded-full border border-[#A34342] mr-1" />
              ) : (
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  className="w-[12px] mr-1 h-[12px]"
                />
              )}
              <Text className="ml-2 text-md">Show Preference</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={invitees}
            renderItem={renderInvitees}
            keyExtractor={(item) => item.id}
            className="mt-2"
          />
        </View>
      ),
    },
  ];

  const [selectedId, setSelectedId] = useState(1);

  const handlePress = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const [hamOpened, setHamOpened] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full">
      {hamOpened && <HamDrawer hamOpened={hamOpened} setHamOpened={setHamOpened} />}
      <View className="flex justify-center px-4">
        <View className="gap-[24px] mt-8">
          <View className="flex flex-row justify-between mt-8">
            <TouchableOpacity onPress={() => {
              setHamOpened(!hamOpened);
            }}>
              <Image
                source={icons.ham}
                resizeMode="contain"
                className="w-[40px] h-[40px]"
                
              />
            </TouchableOpacity>
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
          <View className="flex flex-col">
            <View className="flex flex-row justify-between">
              <Text className="text-3xl font-semibold">Wedding Plan</Text>
            </View>
            <View className="w-[158px] border-[4px] rounded-[3px] border-[#FFAD65]" />
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
                      <Text className="font-bold">{element.name}</Text>
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
                    <View className="rounded-md">{element.component}</View>
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
