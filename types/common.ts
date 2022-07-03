import { Exercise, Log, WorkoutPlan } from './workout';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RootStackParamList = {
  Root: undefined,
  NotFound: undefined
}

export type BottomTabParamList = {
  AutoTagger: undefined
  Celebrities: undefined
}

export type TabOneParamList = {
  BlankMenuScreen: undefined
  CreateWorkoutScreen: undefined
  SelectWorkoutScreen: undefined
  WorkoutScreen: undefined
  SettingsScreen: undefined
  ProfileScreen: undefined
  GuidedSelectionScreen: undefined
  WorkoutListScreen: undefined
}

export type TabTwoParamList = {
  TabOneScreen: undefined
  TabTwoScreen: undefined
}

export type WorkoutFormProps = {
  exercise?: Exercise
  onSubmit: (exercise: Exercise) => void
  onCancel: () => void
}

export type ExerciseCardProps = {
  exercise: Exercise
  onRemovePress: () => void
  onEditPress: () => void
}

export type ExerciseCounterProps = {
  exercise: Exercise
  setLogData: (log: Log) => void
  setWeight: (weight: number, exerciseName: string) => void
}

export type LogCardProps = {
  log: Log
}

export type ActionButtonProps = {
  onPress: () => void
  contained?: boolean
  icon?: string
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  text: string
}

export type RadioButtonProps = {
  label: string
  value: string
}

export type CheckboxProps = {
  label: string
  status: 'checked' | 'unchecked'
  onPress: () => void
}

export type WorkoutPlanContextProps = {
  workoutPlan: WorkoutPlan | null
  setWorkoutPlan: (workoutPlan: WorkoutPlan | null) => void
}
