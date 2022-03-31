import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckboxProps } from '../types/common'
import { Checkbox as PaperCheckbox, useTheme } from 'react-native-paper'

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { colors } = useTheme()

  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkbox}>
        <PaperCheckbox.Item status={props.status} color={colors.primary} label={props.label} onPress={props.onPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: 10,
    width: '20%',
    flex: 1,
    padding: 10,
  },
  checkbox: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
})

export default Checkbox
