import { FC, useState, useMemo, useEffect } from 'react';
import { View, ScrollView, Pressable, TextInput } from 'react-native';
import { Text, Card, Input } from '~/components/ui';
import { Exercise, exercises, MuscleGroup } from './helper';
import { typography } from '~/lib/typography';

interface SelectExerciseProps {
  onSelect: (exercise: Exercise) => void;
}

export const SelectExercise: FC<SelectExerciseProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter exercises based on search term
  const filteredExercises = useMemo(() => {
    if (!searchTerm.trim()) return exercises;
    const searchLower = searchTerm.toLowerCase();
    return exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Group filtered exercises by muscle group
  const exercisesByMuscle = useMemo(() => {
    return filteredExercises.reduce((acc, exercise) => {
      if (!acc[exercise.muscleGroup]) {
        acc[exercise.muscleGroup] = [];
      }
      acc[exercise.muscleGroup].push(exercise);
      return acc;
    }, {} as Record<MuscleGroup, Exercise[]>);
  }, [filteredExercises]);

  useEffect(() => {
    
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Search Input */}
      <View style={{ padding: 20, paddingTop: 10, paddingBottom: 10 }}>
        <Input
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search exercises..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {Object.entries(exercisesByMuscle).map(([muscleGroup, muscleExercises]) => (
          muscleExercises.length > 0 && (
            <View key={muscleGroup} style={{ marginBottom: 20 }}>
              <Text style={[typography.h3, { marginBottom: 10 }]}>{muscleGroup}</Text>
              {muscleExercises.map((exercise) => (
                <Pressable 
                  key={exercise.id}
                  onPress={() => onSelect(exercise)}
                >
                  <Card 
                    style={{ 
                      padding: 15,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={[typography.body]}>{exercise.name}</Text>
                  </Card>
                </Pressable>
              ))}
            </View>
          )
        ))}
        
        {filteredExercises.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={[typography.body, { color: '#6b7280' }]}>
              No exercises found matching "{searchTerm}"
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}; 