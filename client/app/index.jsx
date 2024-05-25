import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "./screens/onboarding";
import EventSelection from "./screens/eventselection";
import BrideGroom from "./screens/bridegroom"
import RegisterName from "./screens/registername"
import SpouseName from "./screens/spousename"
import WeddingDate from "./screens/weddingdate"

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="EventSelection" component={EventSelection} />
          <Stack.Screen name="BrideGroom" component={BrideGroom} />
          <Stack.Screen name="RegisterName" component={RegisterName} />
          <Stack.Screen name="SpouseName" component={SpouseName} />
          <Stack.Screen name="WeddingDate" component={WeddingDate} />
        </Stack.Navigator>
      ) : null}
    </>
  );
};

export default App;