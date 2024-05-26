import { View, Image } from "react-native";
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import icons from "../../constants/icons";
import { InvitationContext } from "../context/InvitationContext";
import Events from "./events";
import Calendar from "./calendar";
import DMs from "./dms";
import Activities from "./activities";

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`px-7 py-3 mb-1 rounded-[10px] ${
          focused ? "bg-[#FFAD65]/[0.48]" : ""
        } flex items-center  w-5 h-5`}
      />
    </View>
  );
};

const TabsLayout = () => {
  const { sendInvitation, setSendInvitation } = useContext(InvitationContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "",
        tabBarInactiveTintColor: "",
        tabBarStyle: {
          backgroundColor: "#F3F3F3",
          borderTopWidth: 1,
          borderTopColor: "",
          height: 84,
        },
      }}
    >
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.event} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="DMs"
        component={DMs}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.dm} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.calendar} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.activity} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;