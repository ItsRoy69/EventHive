import {
  View,
  Text,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import icons from "../../constants/icons";

const CreateEvent = ({ onChangeEvent }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [eventName, setEventName] = useState(null);
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");
  const [location, setLocation] = useState(null);

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        showDatepicker();
        setDateOfEvent(formatDate(currentDate));
      }
    } else {
      showDatepicker();
    }
  };

  const onChangeTime = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      if (Platform.OS === "android") {
        showTimepicker();
        setTimeOfEvent(formatTime(currentTime.toTimeString()));
      }
    } else {
      showTimepicker();
    }
  };

  const handleAddEventClicked = () => {
    const newEvent = {
      name: eventName,
      date: dateOfEvent,
      location: location,
      time: timeOfEvent,
    };
    onChangeEvent(newEvent);
  };

  const showDatepicker = () => {
    setShowDate(!showDate);
  };

  const showTimepicker = () => {
    setShowTime(!showTime);
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    const hours = timeString.split(":")[0];
    const minutes = timeString.split(":")[1];
    let parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    parsedHours = parsedHours % 12 || 12;
    return `${parsedHours}:${minutes} ${suffix}`;
  };

  const [createChannel, setCreateChannel] = useState(true)

  return (
    <View className="flex gap-[15px] px-2 ">
      <View className="mb-3">
        <Text className="text-2xl font-bold ">Create Sub-Event</Text>
        <View className="w-[117px] border-[2px] rounded-[3px] mb-3  border-[#FFAD65]"></View>

        <Text>Sub-event Name</Text>
        <TextInput
          className="border-b border-[#1F2E2A]/[0.41] h-[37px]  bg-[#1F2E2A]/[0.01] text-md "
          placeholder="Rajarshis Haldi Ceremony"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />
      </View>
      <View className="mb-3">
        <Text>When is it happening</Text>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {!showDate && (
          <TouchableOpacity onPress={showDatepicker}>
            <TextInput
              className="border-b border-[#1F2E2A]/[0.41] h-[37px]  bg-[#1F2E2A]/[0.01] text-md text-black "
              placeholder="Rajarshis Haldi Ceremony"
              value={dateOfEvent}
              onChangeText={setDateOfEvent}
              editable={false}
            />
            <Image
              source={icons.date}
              className="absolute right-0 top-0 w-[24px] h-[24px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="mb-3">
        <Text>At what time</Text>
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
        {!showTime && (
          <TouchableOpacity onPress={showTimepicker}>
            <TextInput
              className="border-b border-[#1F2E2A]/[0.41] h-[37px]  bg-[#1F2E2A]/[0.01] text-md text-black "
              placeholder="Rajarshis Haldi Ceremony"
              value={timeOfEvent}
              onChangeText={setTimeOfEvent}
              editable={false}
            />
            <Image
              source={icons.date}
              className="absolute right-0 top-0 w-[24px] h-[24px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="mb-3">
        <Text>Where is it happening</Text>
        <TextInput
          className="border-b border-[#1F2E2A]/[0.41] h-[37px]  bg-[#1F2E2A]/[0.01] text-md text-black "
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Holiday Inn"
        />
      </View>
      <View className="w-full flex flex-row items-center px-2">
        <Switch
          value={createChannel}
          onValueChange={setCreateChannel}
        />
        <Text className="ml-2 pr-6 truncate">Create Group Chat, Anouncement & Gallery channel for this event</Text>
      </View>

      <TouchableOpacity
        className="bg-[#FFAD65] border border-[#FFAD65] rounded-md flex items-center  p-2"
        onPress={handleAddEventClicked}
      >
        <Text className="text-xl font-bold text-white">Add Sub-event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEvent;
