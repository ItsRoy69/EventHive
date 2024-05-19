import { SafeAreaView,ScrollView,View, Text } from 'react-native'
import React from 'react'

const Events = () => {
    return (
       <SafeAreaView className='bg-white h-full'>
        <ScrollView>
            <View className='flex justify-center px-4 my-6'>
                <Text className='text-3xl'>Events Page</Text>
            </View>
        </ScrollView>
       </SafeAreaView> 
    )
}

export default Events