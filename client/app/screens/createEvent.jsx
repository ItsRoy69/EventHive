import {
  View,
  Text,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
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
  const [selectedValues, setSelectedValues] = useState([]);

  const { currentEvent, events } = useGlobalContext();

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
      venedor:selectedValues
    };
    onChangeEvent(newEvent);
  };

  const showDatepicker = () => {
    setShowDate(!showDate);
  };

  const showTimepicker = () => {
    setShowTime(!showTime);
  };
  
  const options = [
    { label: 'Vendor 1', value: 'vendor1' },
    { label: 'Vendor 2', value: 'vendor2' },
    { label: 'Vendor 3', value: 'vendor3' },
    { label: 'Vendor 4', value: 'vendor4' },
    { label: 'Vendor 5', value: 'vendor5' },
  ];
  
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleSelection = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(item => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
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

  const [createChannel, setCreateChannel] = useState(true);

  return (
    <View className="flex gap-[15px] px-2 ">
      <View className="mb-3">
        <Text className="text-2xl font-bold ">Create Event</Text>
        <View className="w-[117px] border-[2px] rounded-[3px] mb-3  border-[#FFAD65]"></View>

        <Text>Event Name</Text>
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
        <Picker
          selectedValue={location}
          onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
          className="border border-[#1F2E2A] h-[37px]  bg-[#1F2E2A]/[0.01] text-md text-black "
        >
          <Picker.Item label="floo1 " value="floor1" />
          <Picker.Item label="floo2 " value="floor2" />
          <Picker.Item label="floo3" value="floor3" />
        </Picker>
      </View>
      <View style={`mb-3`}>
      <Text>Select Vendors</Text>
      <TouchableOpacity onPress={toggleDropdown}>
        <TextInput
          className='border-b border-[#1F2E2A]/[0.41] h-[37px]  bg-[#1F2E2A]/[0.01] text-md text-black'
          value={inputValue}
          placeholder="Click to select vendors"
          editable={false}
        />
      </TouchableOpacity>

      {open && (
        <View style={`border border-gray-300 rounded`}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleSelection(item.value)} className='flex px-5 flex-row justify-between items-center'>
                <Text className='text-md py-2  '>{item.label}</Text>
                {selectedValues.includes(item.value) && <Text className='text-[#FFAD65] text-xl'>✓</Text>}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>
      )}
      <View className='flex flex-row mt-5 gap-[3px] items-center rounded-md p-3'>
        <Text>Selected Vendors: </Text>
        {selectedValues.map((value)=>(
          <View className='bg-[#FFAD65]/[0.7] rounded-md p-2'>
          <Text>{value}</Text>

          </View>

        ))}
        
        
      </View>
    </View>

      <View className="flex flex-row items-center ">
        <Switch value={createChannel} onValueChange={setCreateChannel} />
        <Text className="ml-2">Create channel for this event</Text>
      </View>

      <TouchableOpacity
        className="bg-[#FFAD65] border border-[#FFAD65] rounded-md flex items-center  p-2"
        onPress={handleAddEventClicked}
      >
        <Text className="text-xl font-bold text-white">Add Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEvent;
