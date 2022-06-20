import ActionButton from '../../components/ActionButton'
import Adapter from 'enzyme-adapter-react-16'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CreateWorkoutScreen from '../CreateWorkoutScreen'
import React from 'react'
import { configure, shallow } from 'enzyme'
import { Text } from 'react-native'
import { DatabaseContext } from '../../context/DatabaseContext'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

const mockCreateWorkoutPlan = jest.fn()
jest.mock('../../services/workoutFactory', () => {
  return {
    createWorkoutPlan: () => {
      mockCreateWorkoutPlan()
    }
  }
})

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

  it('Handles "Save" press', async () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    const addWorkoutButton = wrapper.find(ActionButton).at(2)
    addWorkoutButton.simulate('press')
    wrapper.update()
    expect(mockCreateWorkoutPlan).toHaveBeenCalled()
  })
})
