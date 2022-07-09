import React from 'react'
import { Checkbox as PaperCheckbox, useTheme } from 'react-native-paper'
import { CheckboxProps } from '../types/common'
import { StyleSheet, View } from 'react-native'

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { label, status, onPress } = props
  const { colors } = useTheme()

  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkbox}>
        <PaperCheckbox.Item
          color={colors.primary}
          label={label}
          onPress={onPress}
          status={status}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  checkboxContainer: {
    marginBottom: 10,
    width: '20%',
    flex: 1,
    padding: 10,
  },
})

export default Checkbox
