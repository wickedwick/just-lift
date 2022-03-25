import React from 'react'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CreateWorkoutScreen from '../CreateWorkoutScreen'
import ActionButton from '../../components/ActionButton'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<CreateWorkoutScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })

  it('Handles "Add Exercise" press', () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    const addExerciseButton = wrapper.find(ActionButton).at(0)
    addExerciseButton.simulate('press')
    expect(wrapper.find('ExerciseForm').length).toBe(1)
  })

  it('Handles "Add Workout" press', () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    const addWorkoutButton = wrapper.find(ActionButton).at(1)
    addWorkoutButton.simulate('press')
    expect(wrapper.find(Text).render().text()).toBe('Workout B')
  })

  it('Handles "Save" press', () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    const addWorkoutButton = wrapper.find(ActionButton).at(2)
    addWorkoutButton.simulate('press')
    expect(AsyncStorage.setItem).toHaveBeenCalled()
  })
})
