import { Exercise, Log } from './workout'

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
}

export type TabTwoParamList = {
  TabOneScreen: undefined
  TabTwoScreen: undefined
}

export type AppMenuProps = {
  onCameraPress: () => void
  onFolderPress: () => void
  onClearPress: () => void
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
}

export type LogCardProps = {
  log: Log
}
