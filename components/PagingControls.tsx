import ActionButton from './ActionButton';
import React from 'react';
import { PagingControlsProps } from '../types/common';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const PagingControls = (props: PagingControlsProps): JSX.Element => {
  const { workoutIndex, workouts, setWorkoutIndex } = props
  const { colors } = useTheme()
  const styles = createStyles(colors)
  
  return (
    <View style={styles.flexContainer}>
      {workoutIndex > 0 && (
        <ActionButton
          contained
          onPress={() => { setWorkoutIndex(workoutIndex - 1) }}
          text="Previous"
        />
      )}

      {workouts && <Text style={styles.heading}>Workout {workouts[workoutIndex]?.id}</Text>}
      
      {workoutIndex < workouts.length - 1 && (
        <ActionButton
          contained
          onPress={() => { setWorkoutIndex(workoutIndex + 1) }}
          text="Next"
        />
      )}
    </View>
  )
}

const createStyles = (colors: ReactNativePaper.ThemeColors) => StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.text,
  }
})

export default PagingControls
