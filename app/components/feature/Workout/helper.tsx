import { z } from 'zod';

export enum MuscleGroup {
  Chest = 'Chest',
  Back = 'Back',
  Legs = 'Legs',
  Shoulders = 'Shoulders',
  Biceps = 'Biceps',
  Triceps = 'Triceps',
  Abs = 'Abs',
  Cardio = 'Cardio',
}

export const muscleGroupToColor = {
  [MuscleGroup.Chest]: '#FF0000',
  [MuscleGroup.Back]: '#00FF00',
  [MuscleGroup.Legs]: '#0000FF',
  [MuscleGroup.Shoulders]: '#FFFF00',
  [MuscleGroup.Biceps]: '#FF00FF',
  [MuscleGroup.Triceps]: '#00FFFF',
  [MuscleGroup.Abs]: '#FFA500',
  [MuscleGroup.Cardio]: '#000000',
}

export enum Split {
  Push = 'Push',
  Pull = 'Pull',
  Legs = 'Legs',
  Abs = 'Abs',
  Cardio = 'Cardio',
}

export const splitToColor = {
  [Split.Push]: '#FF0000',
  [Split.Pull]: '#00FF00',
  [Split.Legs]: '#0000FF',
  [Split.Abs]: '#FFFF00',
  [Split.Cardio]: '#FF00FF',
}

// Exercise database
export interface Exercise {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
}

export const exercises: Exercise[] = [
  { id: 1, name: 'Bench Press', muscleGroup: MuscleGroup.Chest },
  { id: 2, name: 'Squat', muscleGroup: MuscleGroup.Legs },
  { id: 3, name: 'Deadlift', muscleGroup: MuscleGroup.Back },
  { id: 4, name: 'Shoulder Press', muscleGroup: MuscleGroup.Shoulders },
  { id: 5, name: 'Bicep Curls', muscleGroup: MuscleGroup.Biceps },
  { id: 6, name: 'Tricep Extensions', muscleGroup: MuscleGroup.Triceps },
  { id: 7, name: 'Pull-ups', muscleGroup: MuscleGroup.Back },
  { id: 8, name: 'Push-ups', muscleGroup: MuscleGroup.Chest },
  { id: 9, name: 'Leg Press', muscleGroup: MuscleGroup.Legs },
  { id: 10, name: 'Crunches', muscleGroup: MuscleGroup.Abs },
];

const baseSetSchema = z.object({
  type: z.enum(['weight', 'time', 'distance']),
});

const weightSetSchema = baseSetSchema.extend({
  type: z.literal('weight'),
  weight: z.number(),
  reps: z.number(),
});

const timeSetSchema = baseSetSchema.extend({
  type: z.literal('time'),
  time: z.number(),
});

const distanceSetSchema = baseSetSchema.extend({
  type: z.literal('distance'),
  distance: z.number(),
});

const setSchema = z.discriminatedUnion('type', [
  weightSetSchema,
  timeSetSchema,
  distanceSetSchema,
]);

const exerciseSchema = z.object({
  exerciseId: z.number(),
  sets: z.array(setSchema).min(1),
});

export const workoutSchema = z.object({
  startTime: z.string().datetime(),
  duration: z.number(),
  split: z.nativeEnum(Split),
  exercises: z.array(exerciseSchema).min(1),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;
