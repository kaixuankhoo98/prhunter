import { FC, useState } from "react"
import { View } from "react-native"
import { Button, Text } from 'components/ui'
import { NewWorkout } from "./NewWorkout"
import React from "react"

export const Workout: FC = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const startWorkout = () => {
    setWorkoutStarted(true)
  }
  
  return (
    <View style={{ width: '100%', height: '100%' }}>
      {!workoutStarted ? (
        <>
          <Text>Workout</Text>
          <Button onPress={startWorkout}>
            <Text>Start Workout</Text>
          </Button>
        </>
      ) : (
        <NewWorkout discard={() => setWorkoutStarted(false)}/>
      )}
    </View>
  )
}
