import { Text, View, Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text 
                className={`${(focused) ? "" : ""}}`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '',
            tabBarInactiveTintColor: '',
            tabBarStyle: {
                backgroundColor: '',
                borderTopWidth: 1,
                borderTopColor: '',
                height: 84
            }
        }}
    >
        <Tabs.Screen
            name="events"
            options={{ 
                title: 'Events',
                headerShown: false,
                // tabBarIcon: ({ color, focused }) => (
                //     <TabIcon
                //         icon={icons.events}
                //         color={color}
                //         name="Events"
                //         focused={focused}
                //     />
                // ) 
            }}
        />
        <Tabs.Screen
            name="dms"
            options={{ 
                title: 'DMs',
                headerShown: false,
                // tabBarIcon: ({ color, focused }) => (
                //     <TabIcon
                //         icon={icons.dms}
                //         color={color}
                //         name="DMs"
                //         focused={focused}
                //     />
                // ) 
            }}
        />
        <Tabs.Screen
            name="calendar"
            options={{ 
                title: 'Calendar',
                headerShown: false,
                // tabBarIcon: ({ color, focused }) => (
                //     <TabIcon
                //         icon={icons.calendar}
                //         color={color}
                //         name="Calendar"
                //         focused={focused}
                //     />
                // ) 
            }}
        />
        <Tabs.Screen
            name="activites"
            options={{ 
                title: 'Activities',
                headerShown: false,
                // tabBarIcon: ({ color, focused }) => (
                //     <TabIcon
                //         icon={icons.activities}
                //         color={color}
                //         name="Activities"
                //         focused={focused}
                //     />
                // ) 
            }}
        />
    </Tabs>
  )
}

export default TabsLayout