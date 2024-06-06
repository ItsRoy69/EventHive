import React, { useEffect, useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "expo-router";
import { eventApi } from "../../api/eventApi";
import { useGlobalContext } from "../context/GlobalProvider";
import icons from "../../constants/icons";

const CreateEvent = ({
  addEvent,
  setAddEvent,
  subEventTriggered,
  setSubEventTriggered,
}) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [eventName, setEventName] = useState(null);
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");
  const [location, setLocation] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const { currentEvent, user, setCurrentEvent } = useGlobalContext();
  const eventId = currentEvent._id;
  const token = user.token;

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
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
    if (type === "set") {
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

  useEffect(() => {
    const handleGetVendors = async () => {
      try {
        const response = await eventApi.getVendors(eventId, token);
        const vendorsList = response.data.data.map((vendor) => ({
          name: vendor.user[0].name,
          service: vendor.serviceType,
          id: vendor._id,
        }));
        setVendors(vendorsList);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    const handleGetVenue = async () => {
      try {
        const response = await eventApi.getVenues(eventId);
        const venueList = response.data.data.map((location) => ({
          name: location.name,
          location: location.location,
          id: location._id,
        }));
        setLocation(venueList);
      } catch (err) {
        console.log(err.response);
      }
    };

    handleGetVenue();
    handleGetVendors();
  }, []);

  const createDateTime = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-");
    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    return date;
  };

  const handleAddEventClicked = async () => {
    try {
      const newSubEvent = {
        name: eventName,
        datetime: {
          start: createDateTime(dateOfEvent, timeOfEvent),
          end: createDateTime(dateOfEvent, timeOfEvent),
        },
        location: selectedLocation,
        vendors: selectedValues,
        autoCreateChannels: createChannel,
      };
      console.log(newSubEvent)
      const response = await eventApi.createSubEvent(eventId, newSubEvent, token);
      setSubEventTriggered(true);
      setAddEvent(!addEvent);
    } catch (error) {
      console.error("Error creating sub-event:", error);
    }
  };

  const showDatepicker = () => {
    setShowDate(!showDate);
  };

  const showTimepicker = () => {
    setShowTime(!showTime);
  };

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleSelection = (id, name) => {
    let updatedSelectedValues;
    if (selectedValues.includes(id)) {
      updatedSelectedValues = selectedValues.filter((item) => item !== id);
    } else {
      updatedSelectedValues = [...selectedValues, id];
    }
    setSelectedValues(updatedSelectedValues);
    setInputValue(
      vendors
        .filter((vendor) => updatedSelectedValues.includes(vendor.id))
        .map((vendor) => vendor.name)
        .join(", ")
    );
  };

  const VendorItem = ({ name, service }) => (
    <View className="flex-row items-center py-2 border-b border-gray-200">
      <Text className="text-base">
        {name} - {service}
      </Text>
    </View>
  );

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
    <View className="flex gap-[15px] px-2">
      <View className="mb-3">
        <View className="flex flex-row justify-between">
          <Text className="text-2xl font-bold">Create Sub-Event</Text>
          <TouchableOpacity onPress={() => setAddEvent(!addEvent)}>
            <View className="py-2 px-4 bg-slate-200 rounded-md">
              <Text className="text-slate-400">Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-[117px] border-[2px] rounded-[3px] mb-3 border-[#FFAD65]"></View>
        <Text>Sub-event Name</Text>
        <TextInput
          className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md"
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
              className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md text-black"
              placeholder="Select date"
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
              className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md text-black"
              placeholder="Select time"
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
        <View className="border-b flex border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01]">
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
            className="text-md text-black"
          >
            {location.map((venue) => (
              <Picker.Item key={venue.id} label={`${venue.name} - ${venue.location}`} value={venue.name} />
            ))}
          </Picker>
        </View>
      </View>
      <View className="mb-3">
        <Text>Select Vendors</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          <TextInput
            className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md text-black"
            value={inputValue}
            placeholder="Click to select vendors"
            editable={false}
          />
        </TouchableOpacity>
        {open && (
          <View style={{ maxHeight: 200 }}>
            <FlatList
              data={vendors}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleSelection(item.id, item.name)}
                  className="flex px-5 flex-row justify-between items-center"
                >
                  <VendorItem name={item.name} key={item.id} service={item.service} />
                  {selectedValues.includes(item.id) && (
                    <Text className="text-[#FFAD65] text-xl">✓</Text>
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
      <View className="w-full flex flex-row items-center justify-center px-2">
        <Switch value={createChannel} onValueChange={setCreateChannel} />
        <Text className="ml-2 pr-6 truncate">
          Create Group Chat, Announcement & Gallery channel for this event
        </Text>
      </View>
      <TouchableOpacity
        className="bg-[#FFAD65] border border-[#FFAD65] rounded-md flex items-center p-2"
        onPress={handleAddEventClicked}
      >
        <Text className="text-xl font-bold text-white">Add Sub-event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEvent;

