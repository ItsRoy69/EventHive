import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OnboardingScreen from "./screens/onboarding";
import EventSelection from "./screens/eventselection";
import BrideGroom from "./screens/bridegroom";
import RegisterName from "./screens/registername";
import SpouseName from "./screens/spousename";
import WeddingDate from "./screens/weddingdate";
import GuestInvite from "./screens/guestinvite";
import VendorInvite from "./screens/vendorinvite";
import GuestDetails from "./screens/guestdetails";
import GroomName from "./screens/groomname";
import GroupChats from "./screens/groupchats";
import DMChats from "./screens/dmchats";
import SignUp from "./auth/sign-up";
import SignIn from "./auth/sign-in";
import Floor from "./floor";
import TabsLayout from "./tabs/_layout";
import AddGuest from "./screens/addGuest";
import Gallery from "./screens/gallery";
import { GlobalProvider } from "./context/GlobalProvider";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event;
      const { path, queryParams } = Linking.parse(url);

      if (path.startsWith("invite")) {
        const { eventId, inviteId } = queryParams;
        navigation.navigate("GuestInvite", { eventId, inviteId });
      }
    };

    Linking.addEventListener("url", handleDeepLink);

    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  return (
    <>
      <GlobalProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
              <Stack.Screen name="EventSelection" component={EventSelection} />
              <Stack.Screen name="BrideGroom" component={BrideGroom} />
              <Stack.Screen name="RegisterName" component={RegisterName} />
              <Stack.Screen name="SpouseName" component={SpouseName} />
              <Stack.Screen name="WeddingDate" component={WeddingDate} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Floor" component={Floor} />
              <Stack.Screen name="TabsLayout" component={TabsLayout} />
              <Stack.Screen name="GuestInvite" component={GuestInvite} />
              <Stack.Screen name="VendorInvite" component={VendorInvite} />
              <Stack.Screen name="GuestDetails" component={GuestDetails} />
              <Stack.Screen name="GroomName" component={GroomName} />
              <Stack.Screen name="GroupChats" component={GroupChats} />
              <Stack.Screen name="DMChats" component={DMChats} />
              <Stack.Screen name="AddGuest" component={AddGuest} />
              <Stack.Screen name="Gallery" component={Gallery} />
            </Stack.Navigator>
          ) : null}
        </GestureHandlerRootView>
      </GlobalProvider>
    </>
  );
};

export default App;
