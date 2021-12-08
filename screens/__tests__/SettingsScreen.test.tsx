import React from 'react'
import { Button } from 'react-native-paper'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SettingsScreen from '../SettingsScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<SettingsScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<SettingsScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })

  it('Handles "Delete Workout Plan button" press', () => {
    const spy = jest.spyOn(AsyncStorage, 'removeItem')
    const wrapper = shallow(<SettingsScreen {...props} />)
    const removeWorkoutPlanButton = wrapper.find(Button).at(0)
    removeWorkoutPlanButton.simulate('press')
    expect(spy).toHaveBeenCalled()
  })
})