import { Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoaderSpinner = ({ text }) => {
  return (
    <View className="border h-full w-full flex items-center justify-center bg-white">
        <View className="flex flex-col gap-5">
            <Text className="text-xl text-[#1F2E2A]">
                {text}
            </Text>
            <ActivityIndicator size="large" color="#A34342"/>
        </View>
    </View>
  )
}

export default LoaderSpinner