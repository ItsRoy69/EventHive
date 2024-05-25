import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const CustomDayComponent = ({ date, state, marking, }) => {
  const isSelected = marking?.selected;
  const isToday = state === 'today';
//   const dayText = date?.day ? date.day.toString() : '';

  return (
    <TouchableOpacity >
      <View className={`flex justify-center items-center mb-2 w-8 h-8 ${isSelected ? 'rounded-md bg-[#FFAD65] text-white' : ''} ${isToday ? 'border-2 border-[#FFAD65] rounded-md' : ''}`}>
        <Text className={`${isSelected ? 'text-white' : 'text-base'} ${state === 'disabled' ? 'text-slate-400' : ''}`}>{date.day}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDayComponent;
