import React from 'react';
import { View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const DraggableResizableComponent = ({ children }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const width = useSharedValue(100);
  const height = useSharedValue(100);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    }
  });

  const resizeGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = width.value;
      ctx.startHeight = height.value;
    },
    onActive: (event, ctx) => {
      width.value = ctx.startWidth + event.translationX;
      height.value = ctx.startHeight + event.translationY;
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ],
    width: width.value,
    height: height.value
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[animatedStyle, { position: 'absolute' }]}>
        {children}
        <PanGestureHandler onGestureEvent={resizeGestureHandler}>
          <Animated.View style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, backgroundColor: 'grey', cursor: 'nwse-resize' }} />
        </PanGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableResizableComponent;
