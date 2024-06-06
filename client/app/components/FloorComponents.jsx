import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';


const Room = ({ name }) => (
  <View className="flex-1 h-[65px] bg-[#D9D9D9]  w-[52px] border border-black justify-center items-center">
    <Text className='text-center'>{name}</Text>
  </View>
);

const Entrance = () => (
  <View className="flex-1 h-20 bg-[#D9D9D9] border border-black justify-center items-center">
    <Text>Entrance</Text>
  </View>
);

const Stage = () => (
  <View className="flex-1  bg-[#D9D9D9] h-[40px] w-[150px] border border-black items-center justify-center">
    <Text>Stage
    </Text>
  </View>
);

const Verandah = () => (
  <View className="h-[28px] bg-[#D9D9D9]  w-[275px] border border-black justify-center items-center">
    <Text>Verandah</Text>
  </View>
);

const SofaSeating = () => (
  <View className="h-20 border border-black justify-center items-center">
    <Text>Sofa-seating</Text>
  </View>
);

const TableArea = () => (
  <View className="flex-1 h-[74px] border w-[200px] border-black justify-center items-center">
    <Text>Chair & Table</Text>

  </View>
);





export { Room, Entrance, Stage, Verandah, SofaSeating, TableArea };
