import React from 'react'
import { ScrollView, View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import { TabOneParamList } from '../types/common'

export default function GuidedSelectionScreen({
  navigation
}: StackScreenProps<TabOneParamList, 'GuidedSelectionScreen'>): JSX.Element {
  const [isBeginner, setIsBeginner] = React.useState(true)
  return (
    <ScrollView>
      <Text>Choose your experience level</Text>
      <RadioButton.Group onValueChange={newValue => setIsBeginner(newValue === 'true')} value={isBeginner ? 'true' : 'false'}>
        <View>
          <Text>Beginner</Text>
          <RadioButton value="true" />
        </View>
        <View>
          <Text>Advanced</Text>
          <RadioButton value="false" />
        </View>
      </RadioButton.Group>

      <Text>Choose your equipment</Text>
      
    </ScrollView>
  )
}
