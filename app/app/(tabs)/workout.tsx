import * as React from 'react';
import { View } from 'react-native';
import { Workout } from '~/components/feature/Workout/Workout';

export default function WorkoutScreen() {
  return (
    <View style={{
      padding: 6,
    }}>
      <Workout />
    </View>
  );
} 