import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BrideGroom = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledView className="mb-8">
        {/* Render the bride and groom illustration */}
      </StyledView>
      <StyledText className="text-2xl font-bold mb-4">Great, so who are you?</StyledText>
      <StyledView className="flex-row space-x-4">
        <StyledTouchableOpacity
          className={`px-6 py-2 rounded-md ${
            selectedAnswer === 'The Bride' ? 'bg-pink-500' : 'bg-gray-200'
          }`}
          onPress={() => handleAnswerSelection('The Bride')}
        >
          <StyledText
            className={`text-lg font-semibold ${
              selectedAnswer === 'The Bride' ? 'text-white' : 'text-gray-800'
            }`}
          >
            The Bride
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className={`px-6 py-2 rounded-md ${
            selectedAnswer === 'The Groom' ? 'bg-blue-500' : 'bg-gray-200'
          }`}
          onPress={() => handleAnswerSelection('The Groom')}
        >
          <StyledText
            className={`text-lg font-semibold ${
              selectedAnswer === 'The Groom' ? 'text-white' : 'text-gray-800'
            }`}
          >
            The Groom
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default BrideGroom;