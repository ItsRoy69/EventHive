import { View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'

const SignIn = () => {
    
    const blankCreds = {
        email: '', 
        phone: '', 
        password: ''
    }
    const [creds, setCreds] = useState(blankCreds);
    const navigation = useNavigation();

    const handleSubmit = async () => {

    }
    
    return (
        <View>
            <Text>SignIn</Text>
        </View>
    )
}

export default SignIn