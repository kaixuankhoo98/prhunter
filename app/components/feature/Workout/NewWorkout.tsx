import { FC, useState } from "react"
import { ScrollView, View } from "react-native"
import { Text, Button, SelectInput, Card, Modal } from "components/ui"
import { Split, WorkoutSchema, workoutSchema, MuscleGroup, Exercise as ExerciseType } from "./helper";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimeCounter } from "./TimeCounter";
import { WorkoutFooter } from "./WorkoutFooter";
import { Exercise } from "./Exercise";
import { SelectExercise } from "./SelectExercise";
import { Plus } from "~/lib/icons/Plus";
import { typography } from "~/lib/typography";

export const NewWorkout: FC<{ discard: () => void }> = ({ discard }) => {
  const [showExerciseSelect, setShowExerciseSelect] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WorkoutSchema>({
    defaultValues: {
      startTime: new Date().toISOString(),
      split: Split.Push,
      duration: 0,
      exercises: [],
    },
    resolver: zodResolver(workoutSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "exercises",
  });

  const startTime = watch('startTime');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const onSubmit = (data: WorkoutSchema) => {
    console.log('Form submitted with data:', data);
  };

  const handleFinish = () => {
    console.log('handleSubmitPress');
    console.log(elapsedSeconds);
    setValue('duration', elapsedSeconds);
    handleSubmit(onSubmit)();
  }

  const handleAddExercise = () => {
    setShowExerciseSelect(true);
  };

  const handleSelectExercise = (exercise: ExerciseType) => {
    append({
      exerciseId: exercise.id,
      sets: [{
        type: 'weight',
        weight: 0,
        reps: 0,
      }],
    });
  };

  const splitOptions = Object.values(Split).map((split) => ({
    label: split,
    value: split,
  }));

  return (
    <View style={{ flex: 1 }}>
      <TimeCounter
        startTime={startTime}
        onTimeUpdate={(seconds) => setElapsedSeconds(seconds)}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 60 }}
      >
        {/* Display all form errors */}
        {Object.keys(errors).length > 0 && (
          <View className="mb-4 rounded-md bg-red-50 p-4">
            <Text className="text-sm font-medium text-red-800">Please fix the following errors:</Text>
            <View className="mt-2">
              {Object.entries(errors).map(([field, error]) => (
                <Text key={field} className="text-sm text-red-700">
                  • {field}: {error?.message as string}
                </Text>
              ))}
            </View>
          </View>
        )}

        <Controller
          control={control}
          name="split"
          render={({ field: { onChange, onBlur, value } }) => (
            <SelectInput
              label='Split'
              options={splitOptions}
              placeholder="Push, Pull... Legs?"
              value={value}
              onChange={onChange}
            />
          )}
        />

        {/* Exercises */}
        <View style={{ marginTop: 20, gap: 15 }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Exercises</Text>
          </View>

          {fields.map((field) => (
            <Exercise
              key={field.id}
              exerciseId={field.exerciseId}
              sets={field.sets}
            />
          ))}
          <Button 
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }} 
            variant="outline" 
            onPress={handleAddExercise}
          >
            {/* <Plus /> */}
            <Text style={[typography.button]}>Add Exercise</Text>
          </Button>
        </View>
      </ScrollView>

      <WorkoutFooter
        onDiscard={discard}
        onFinish={handleFinish}
      />

      <Modal
        visible={showExerciseSelect}
        onClose={() => setShowExerciseSelect(false)}
        title="Select Exercise"
      >
        <SelectExercise
          onSelect={(exercise) => {
            handleSelectExercise(exercise);
            setShowExerciseSelect(false);
          }}
        />
      </Modal>
    </View>
  )
}
