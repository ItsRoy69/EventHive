import {  View, Text, Image, TouchableOpacity, Modal, Button, SafeAreaView,TouchableWithoutFeedback } from 'react-native'
import React ,{useState}from 'react'
import { TextInput } from 'react-native-gesture-handler'

const PaymentReceipt =({amount,comment,paymentTo,setPaymentTo,paymentDone,setPaymentDone,onClose}) =>{
    const handleClose=() =>{
        setPaymentDone(!paymentDone)
        setPaymentTo(!paymentTo)
        onClose()
    }
    return (
     <TouchableWithoutFeedback onPress={handleClose} >
        <View className="flex-1 justify-center items-center bg-black/[0.5]">
          <View className="bg-white flex items-center pt-6 pb-20 px-8  rounded-md w-[80%]">
            <Image source={require('../../assets/icons/smile.png')} resizeMode='contain' className='w-[32px] h-[32px]' />
            <Text className="text-2xl font-bold mb-8 py-2">Payment Successful</Text>
            <View className='w-[230px] flex flex-row items-center justify-center gap-[2px] mb-2 bg-[#B9B9B9]/[0.2] rounded-md h-[71px] py-4 px-4'>
                <Image source={require('../../assets/icons/rupee.png')} resizeMode='contain' className='w-[32px] h-[32px]'/>
                <Text className='text-5xl font-bold text-[#18BB6D]'>{amount}</Text>
            </View>
            <View className='flex items-center mb-7'>
                <Text className='py-2'>{comment}</Text>   
            </View>
            <TouchableOpacity  >
              <View className="p-1 flex gap-[3px] flex-row w-[200px] items-center justify-center h-[47px]  bg-[#F3F3F3] rounded-[8px] text">
              <Image source={require('../../assets/icons/share.png')} resizeMode='contain' className='w-[20px] h-[20px]'/>
                  <Text className='text-xl font-bold'>Share Receipt</Text>
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
        </TouchableWithoutFeedback>
    )
   
}
const PaymentTo = ({item,paymentTo,setPaymentTo,onClose}) =>{
    const [amount,setAmount] = useState()
    const [comment,setComment] = useState('')
    const [paymentDone,setPaymentDone] = useState(false)

    return (
   <>
   {paymentDone ? (
    <PaymentReceipt
        amount={amount}
        comment={comment}
        paymentDone={paymentDone}
        paymentTo={paymentTo}
        setPaymentTo={setPaymentTo}
        setPaymentDone={setPaymentDone}
        onClose={onClose}
    />
   ):(
    <TouchableWithoutFeedback onPress={()=>setPaymentTo(!paymentTo)}>
        <View className="flex-1 justify-center items-center bg-black/[0.5]">
          <View className="bg-white flex items-center pt-6 pb-20 px-8  rounded-md w-[80%]">
            <Text className="text-xl font-bold mb-8">Payment to {item?.name}</Text>
            <View className='w-[230px] mb-2 bg-[#B9B9B9]/[0.2] rounded-md h-[71px] p-6'>
                <TextInput
                value={amount}
                onChangeText={(text)=>setAmount(text)}
                className='text-2xl text-center'
                placeholder='Enter any amount'

                />
            </View>
            <View className='flex items-center mb-7'>
                <Text className='py-2'>Enter any comment:</Text>
                <View className='w-[230px] px-4 py-2  h-[35px] bg-[#B9B9B9]/[0.1] rounded-md'>
                <TextInput
                    value={comment}
                    onChangeText={(text)=>setComment(text)}
                    className='text-md'
                    placeholder={`Payment for ${item?.name}`}
                />
                </View>
            </View>
            <TouchableOpacity onPress={()=>setPaymentDone(true)} >
              <View className="p-1 flex gap-[3px] flex-row w-[200px] items-center justify-center h-[40px]  bg-[#18BB6D] rounded-[8px] text-white">
              <Image source={require('../../assets/icons/payment.png')} resizeMode='contain' className='w-[20px] h-[20px]'/>
                  <Text className='text-white text-xl font-bold'>Make Payment</Text>
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
        </TouchableWithoutFeedback>
   )}
    
        </>
    )
}

const PaymentModal = ({item,visible,onClose}) => {
    const [paymentTo, setPaymentTo] = useState(false)
    
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
        >
    {paymentTo?( 
    <PaymentTo
        item={item}
        paymentTo={paymentTo}
        setPaymentTo={setPaymentTo}
        onClose={onClose}
       
    />):(
 <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 justify-center items-center bg-black/[0.5]">
            <View className="bg-white flex items-center pt-6 pb-20 px-8  rounded-md w-[80%]">
              <Text className="text-xl font-bold">{item?.name}</Text>
              <View className="border w-[120px] mb-8 flex self-center border-[2px] rounded-[3px] border-[#FFAD65]"></View>
              <TouchableOpacity onPress={()=>setPaymentTo(true)}>
                <View className="p-1 flex gap-[3px] flex-row w-[200px] items-center justify-center h-[40px]  bg-[#18BB6D] rounded-[8px] text-white">
                <Image source={require('../../assets/icons/payment.png')} resizeMode='contain' className='w-[20px] h-[20px]'/>
                    <Text className='text-white text-xl font-bold'>Make Payment</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="py-1 px-3 flex gap-[3px] flex-row w-[200px] mt-5 items-center justify-center h-[40px]  bg-[#F3F3F3] rounded-[8px] text-white">
                <Image source={require('../../assets/icons/paymentHistory.png')} resizeMode='contain' className='w-[20px] h-[20px]'/>
                    <Text className='text-xl font-bold'>Payment History</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View className="p-1 flex gap-[3px] flex-row w-[200px] mt-5 items-center justify-center h-[40px]  bg-[#F3F3F3] rounded-[8px] text-white">
                    <Image source={require('../../assets/icons/contact.png')} resizeMode='contain' className='w-[20px] h-[20px]'/>
                    <Text className="text-xl font-bold">View Contact</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableWithoutFeedback>
    )}
       
        </Modal>
      );
  
}

export default PaymentModal