import { FC } from 'react';
import { View } from 'react-native';
import { Text, Card } from '~/components/ui';
import { exercises } from './helper';
import { typography } from '~/lib/typography';

interface WeightSet {
  type: 'weight';
  weight: number;
  reps: number;
}

interface TimeSet {
  type: 'time';
  time: number;
}

interface DistanceSet {
  type: 'distance';
  distance: number;
}

type Set = WeightSet | TimeSet | DistanceSet;

interface ExerciseProps {
  exerciseId: number;
  sets: Set[];
}

export const Exercise: FC<ExerciseProps> = ({ exerciseId, sets }) => {
  const exercise = exercises.find(e => e.id === exerciseId);
  
  return (
    <Card style={{ padding: 20 }}>
      <Text style={[typography.h3]}>{exercise?.name || 'Unknown Exercise'}</Text>
      
      {/* Sets Table Header */}
      <View className="flex-row mb-2">
        <Text className="flex-1 font-medium">Set</Text>
        <Text className="flex-1 font-medium">Type</Text>
        <Text className="flex-1 font-medium">Value</Text>
      </View>

      {/* Sets */}
      {sets.map((set, setIndex) => (
        <View key={setIndex} className="flex-row mb-2">
          <Text className="flex-1">{setIndex + 1}</Text>
          <Text className="flex-1">{set.type}</Text>
          <Text className="flex-1">
            {set.type === 'weight' && `${set.weight}kg × ${set.reps}`}
            {set.type === 'time' && `${set.time}s`}
            {set.type === 'distance' && `${set.distance}m`}
          </Text>
        </View>
      ))}
    </Card>
  );
}; 