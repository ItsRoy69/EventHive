import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import CreateEvent from "../screens/createEvent";
import React, { useEffect, useState } from "react";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { Calendar, Agenda } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import HamDrawer from "../components/HamDrawer";
import { eventApi } from "../../api/eventApi";

const CalendarItem = () => {
  const weddingDate = "2024-05-31";
  const [selectedDate, setSelectedDate] = useState(null);
  const [addEvent, setAddEvent] = useState(false);
  
  const { currentEvent, user } = useGlobalContext();
  const eventId = currentEvent._id;
  const token = user.token; 
  
  
  
  const [items, setItems] = useState({
    "2024-05-29": [
      { name: "Meeting with client", time: "10:00 AM", location: "Rajarhat" },
    ],
    "2024-05-30": [
      { name: "Meeting with florist bimal da", time: "9:00 AM" },
      { name: "Venue Decorator Meeting", time: "2:00 PM" },
      { name: "Presentation", time: "5:00 PM" },
    ],
    "2024-06-01": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
    "2024-06-02": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
  });
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(()=>{
    const getSubEvents = async() =>{
      try{
      const response = await eventApi.getSubEvents(eventId,token)
      console.log("Get Sub events",response.data)
      }
      catch(error){
        console.log(error)
        Alert.alert("Error",error.message)
      }
    }
    getSubEvents()
  },[])
  

  useEffect(() => {
    console.log(selectedDate)
    const tempItems = items[selectedDate] ? items[selectedDate] : [];
    setFilteredItems(tempItems);
  }, [selectedDate]);

  const handleAddEventPressed = () => {
    setAddEvent(!addEvent);
  };

  const formatDateTime = (isoString) =>{
    const date = new Date(isoString);

  // Extract date components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');

  // Extract time components
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  // Determine AM/PM and convert hours to 12-hour format
  const isPM = hours >= 12;
  const modifier = isPM ? 'PM' : 'AM';
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  hours = String(hours).padStart(2, '0');

  // Construct date and time strings
  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes} ${modifier}`;

  return { dateString, timeString };
  }

  const handleChangeEvent = (newEvent) =>{
    console.log("from calendar: ",newEvent)
    const {eventDate,time} = formatDateTime(newEvent.datetime)
    const eventDetails = {
      name: newEvent.name,
      time: time,
      location: newEvent.location
    }
    setItems((prevItems) => {
      if (prevItems[eventDate]) {
        return {
          ...prevItems,
          [eventDate]: [...prevItems[eventDate], eventDetails],
        };
      }
      return {
        ...prevItems,
        [eventDate]: [eventDetails],
      };
    });

    setFilteredItems(prevFilteredItems => {
      if (selectedDate === eventDate) {
        return [...prevFilteredItems, eventDetails];
      }
      return prevFilteredItems;
    });
  
    handleAddEventPressed()
  }
 

  const [hamOpened, setHamOpened] = useState(false)

  return (
    <SafeAreaView className="h-full">
      {hamOpened && <HamDrawer hamOpened={hamOpened} setHamOpened={setHamOpened} />}
      <ScrollView>
        <View className="flex justify-center px-4">
          <View className="flex flex-row justify-between mt-14">
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
          <View className="mt-[28px] ">
            {!addEvent ? (
              <>
                <Calendar
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: "orange",
                    },
                  }}
                  className="rounded-md py-2 px-2"
                  theme={{
                    calendarBackground: "rgba(255, 173, 101, 0.1)",
                    textSectionTitleDisabledColor: "#d9e1e8",
                    selectedDayBackgroundColor: "#FFAD65",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "black",
                    todayBackgroundColor: "rgba(255, 173, 101, 0.4)",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e1e8",
                    dotColor: "#00adf5",
                    selectedDotColor: "#FFAD65",
                    arrowColor: "orange",
                    disabledArrowColor: "#d9e1e8",
                    "stylesheet.calendar.header": {
                      monthText: {
                        color: "#A34342",
                        fontWeight: "bold",
                        fontSize: 20,
                      },
                    },
                    "stylesheet.calendar.main": {
                      week: {
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    },
                    indicatorColor: "blue",
                    textDayFontFamily: "monospace",
                    textMonthFontFamily: "monospace",
                    textDayHeaderFontFamily: "monospace",
                    textDayFontWeight: "300",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "300",
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                  }}
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                  }}
                 
                />
                <View className="reminders flex  mt-1 mb-3">
                  {filteredItems && filteredItems.length > 0 && (
                    <View className="flex mb-1 flex-row items-center justify-between">
                      <Text className="text-sm text-slate-400">Reminders</Text>
                      <TouchableOpacity onPress={handleAddEventPressed}>
                        <View className="w-[110px] h-[26px]  flex-row rounded-[4px]  justify-center p px-2 bg-[#FFAD65]">
                          <Text className="text-white flex self-center text-xl px-1">
                            +
                          </Text>
                          <Text className="text-white flex self-center text-md font-bold">
                            {" "}
                            Schedule
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View className="mt-1">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <View
                          className="bg-[#FFAD65]/[0.14] h-[58px] rounded-[8px]  flex flex-row border-l-8 border-[#FFAD65] justify-between items-center  w-full px-3 mb-3 py-2"
                          key={index}
                        >
                          <View className="flex  justify-start">
                            <Text className="text-black font-bold">
                              {" "}
                              {item.name}
                            </Text>

                            <View className="flex flex-row gap-[5px]">
                              <Text>{item.location}</Text>

                              <Text>{item.time}</Text>
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
                      <>
                        <View className="mt-4 flex self-center">
                          <Text className="text-slate-400 text-md">
                            {" "}
                            No reminders to display
                          </Text>
                          <TouchableOpacity onPress={handleAddEventPressed}>
                            <View className="w-[125px] mt-5  self-center flex-row rounded-[4px]  justify-center py-1 px-2 bg-[#FFAD65]">
                              <Text className="text-white flex self-center text-2xl px-1">
                                +
                              </Text>
                              <Text className="text-white flex self-center text-lg font-bold">
                                {" "}
                                Add Event
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              </>
            ):(
              <CreateEvent
                onChangeEvent = {handleChangeEvent}
              />
            )}
           

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarItem;
