import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { eventApi } from "../../api/eventApi";
import { useGlobalContext } from "../context/GlobalProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import icons from "../../constants/icons";
import { Picker } from "@react-native-picker/picker";

const CreateMeeting = ({ addMeeting, setAddMeeting,setMeetingTriggered, meetingTriggered }) => {
    const [subject, setSubject] = useState('');
    const [vendorId, setVendorId] = useState();
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [timeOfEvent, setTimeOfEvent] = useState('');
    const [vendors, setVendors] = useState([]);

  
    const { currentEvent, user } = useGlobalContext();
    const eventId = currentEvent._id;
    const token = user.token;
  
    const showDatepicker = () => {
        setShowDate(!showDate);
    };
    // console.log("Vendor Id: ",vendorId)
    const showTimepicker = () => {
        setShowTime(!showTime);
    };
  
    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setDateOfEvent(formatDate(currentDate));
        }
        setShowDate(false);  // Close the date picker after selecting a date
    };
  
    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            const currentTime = selectedTime || time;
            setTime(currentTime);
            setTimeOfEvent(formatTime(currentTime.toTimeString()));
        }
        setShowTime(false);  // Close the time picker after selecting a time
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
  
    useEffect(() => {
        const handleGetVendors = async () => {
            try {
                const response = await eventApi.getVendors(eventId, token);
                const vendorsList = response.data.data.map((vendor) => ({
                    name: vendor.user[0].name,
                    service: vendor.serviceType,
                    id: vendor._id
                }));
                setVendors(vendorsList);
            } catch (error) {
                console.error("Error fetching vendors:", error);
            }
        };
  
        handleGetVendors();
    }, []);

    const createDateTime =(dateStr,timeStr)=>{
        const [year, month, day] = dateStr.split('-');
    
      // Parse the time string and convert to 24-hour format
      let [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
    
      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
    
      // Create a Date object with the parsed values
      const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    
      return date
    }

    const handleAddMeetingClicked = async() =>{
        try{
            const meeting = {
                vendorId:vendorId,
                subject:subject,
                datetime:createDateTime(dateOfEvent, timeOfEvent),
                location:location
            }
            console.log("Meeting",meeting)
            
            const response = await eventApi.createMeeting(eventId,meeting,token)
            // console.log("Set Meeting:",response.status)
            setMeetingTriggered(true)
            setAddMeeting(!addMeeting)
        }catch (error) {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    }
    
  
    return (
        <View className="flex gap-[15px] px-2">
            <View className="mb-3">
                <View className="flex flex-row justify-between">
                    <Text className="text-2xl font-bold">Create Meeting</Text>
                    <TouchableOpacity onPress={() => setAddMeeting(!addMeeting)}>
                        <View className="py-2 px-4 bg-slate-200 rounded-md">
                            <Text className="text-slate-400">Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="w-[117px] border-[2px] rounded-[3px] mb-4 border-[#FFAD65]"></View>
                <Text>Meeting Subject</Text>
                <TextInput
                    className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md"
                    placeholder="Venue Decide"
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                />
            </View>
            <View className="mb-3">
                <Text>Vendor</Text>
                <View className='border-b flex border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01]'>
                <Picker
                    selectedValue={vendorId}
                    onValueChange={(itemValue, itemIndex) => setVendorId(itemValue)}
                    className=" text-md text-black"
                >
                    {vendors.map((vendor) => (
                        <Picker.Item key={vendor.id} label={vendor.name} value={vendor.id} />
                    ))}
                </Picker>
                </View>
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
                            placeholder="Select Date"
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
                            placeholder="Select Time"
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
                    className="border-b border-[#1F2E2A]/[0.41] h-[37px] bg-[#1F2E2A]/[0.01] text-md"
                    placeholder="Location"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
            </View>
            <TouchableOpacity
        className="bg-[#FFAD65] border border-[#FFAD65] rounded-md flex items-center  p-2"
        onPress={handleAddMeetingClicked}
      >
        <Text className="text-xl font-bold text-white">Schedule Meeting</Text>
      </TouchableOpacity>
        </View>
    );
};

export default CreateMeeting;
