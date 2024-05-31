import { View, Image, Text, Alert } from "react-native";
import { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import icons from "../../constants/icons";
import { InvitationContext } from "../context/InvitationContext";
import Events from "./Events";
import CalendarItem from "./calendar";
import Activities from "./activities";
import EventPlan from "./EventPlan";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";
import { eventApi } from "../../api/eventApi";
import LoaderSpinner from "../components/LoaderSpinner";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, icon, color, focused, disabled }) => {
  return (
    <View className="items-center flex justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`px-7 py-3 mb-1 rounded-[10px] ${
          focused ? "bg-[#FFAD65]/[0.48]" : ""
        } flex items-center  w-5 h-5 ${disabled && "opacity-50"}`}
      />
      <Text className="text-black text-md">{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  const { sendInvitation, setSendInvitation } = useContext(InvitationContext);
  const type = "guest";

  const { user, setEvents, currentEvent, setCurrentEvent } = useGlobalContext();

  useEffect(() => {
    const getEventsData = async () => {
      try {
        const response = await eventApi.getAllEvents(user.token);
        const res = response.data.data
        setCurrentEvent(res[0].event[0]);
        setEvents(res[0].event);
      } catch (err) {
        console.log(err)
        Alert.alert("Error", err.message)
      }
    }
    if (user?.token) {
      getEventsData()
    }
  }, [user])

  return (
    <>
    {
      currentEvent?.name ?
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "",
            tabBarInactiveTintColor: "",
            tabBarStyle: {
              backgroundColor: "#F3F3F3",
              borderTopWidth: 1,
              borderTopColor: "#E6E6E6",
              height: 84,
            },
          }}
        >
          <Tab.Screen
            name="Events"
            component={Events}
            options={{
              tabBarIcon: ({ name, color, focused }) => (
                <TabIcon
                  icon={icons.event}
                  name="Events"
                  color={color}
                  focused={focused}
                  // disabled={!currentEvent?.name}
                />
              ),
            }}
          />

          <Tab.Screen
            name="EventPlan"
            component={EventPlan}
            options={{
              tabBarIcon: ({ name, color, focused }) => (
                <TabIcon
                  icon={icons.eventPlan}
                  name="Event Plan"
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
          {/* ):(
            <Tab.Screen
            name="DMs"
            component={DMs}
            options={{
              tabBarIcon: ({ name,color, focused }) => (
                <TabIcon icon={icons.dm} name ="DMs" color={color} focused={focused} />
              ),
            }}
          />
          )} */}

          <Tab.Screen
            name="calendar"
            component={CalendarItem}
            options={{
              tabBarIcon: ({ name, color, focused }) => (
                <TabIcon
                  icon={icons.calendar}
                  name="Calendar"
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="activities"
            component={Activities}
            options={{
              tabBarIcon: ({ name, color, focused }) => (
                <TabIcon
                  icon={icons.activity}
                  name="Activities"
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
        </Tab.Navigator>
     : 
      <LoaderSpinner text={'Setting up your workspace...'}/>
    } 
    
    <StatusBar backgroundColor="#F3F3F3" style='dark'/>
    </>
  );
};

export default TabsLayout;
