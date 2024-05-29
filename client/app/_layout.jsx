import React from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import {CreateEventProvider} from "./context/CreateEventContext"; 

const RootLayout = () => {
  return (
    <CreateEventProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
    </CreateEventProvider>
  );
};

export default RootLayout;