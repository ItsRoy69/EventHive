import React from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import {CreateEventProvider} from "./context/CreateEventContext"; 
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <CreateEventProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#F3F3F3" style='dark'/>
    </CreateEventProvider>
  );
};

export default RootLayout;