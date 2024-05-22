import { ScrollView, StatusBar } from 'react-native'
import {  Text, View } from 'react-native'
import { Link ,Redirect,router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


import React from 'react'


export default function App () {
    // const {loading,isLogged } = useGlobalContext();
    // if(!loading && isLogged) return <Redirect href='/home'/>

    
    return (
       <SafeAreaView className = "h-full">
           <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className='w-full items-center flex'>
                    <Text>This is index page</Text>
                    <Link href='/events' className='text-blue-700'>Go to events</Link>
                </View>
           </ScrollView>
           
       </SafeAreaView>
    )
}

