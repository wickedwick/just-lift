import React from 'react';
import { RadioButton as PaperRadioButton, useTheme } from 'react-native-paper';
import { RadioButtonProps } from '../types/common';
import { StyleSheet, View } from 'react-native';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { colors } = useTheme()
  
  return (
    <View style={styles.radioContainer}>
      <View style={styles.radio}>
        <PaperRadioButton.Item value={props.value} color={colors.primary} label={props.label} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  radioContainer: {
    marginBottom: 10,
    width: '20%',
    flex: 1,
    padding: 10,
  },
})

export default RadioButton
