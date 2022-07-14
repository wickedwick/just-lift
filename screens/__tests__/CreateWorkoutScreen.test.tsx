import ActionButton from '../../components/ActionButton'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import CreateWorkoutScreen from '../CreateWorkoutScreen'
import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import { Text } from 'react-native'
import { WorkoutPlanContext } from '../../context/WorkoutPlanContext'
import { WorkoutPlan } from '../../types/workout'
import { act } from 'react-test-renderer'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

const mockCreateWorkoutPlan = jest.fn()
jest.mock('../../services/workoutFactory', () => {
  return {
    createWorkoutPlan: () => {
      mockCreateWorkoutPlan()
      return {
        workouts: [
          {
            id: 'A',
            exercises: [],
            name: 'Workout 1'
          }
        ],
        workoutIndex: 0
      }
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

  it('Handles "Add Workout" press', async () => {
    const workoutPlan: WorkoutPlan = {
      workouts: [
        {
          id: 'A',
          exercises: [],
        }
      ],
      daysPerWeek: 4,
      workoutIndex: 0,
      workoutInProgress: false
    }

    const wrapper = mount(<WorkoutPlanContext.Provider value={{ workoutPlan, setWorkoutPlan: () => {} }}><CreateWorkoutScreen {...props} /></WorkoutPlanContext.Provider>)
    await act(() => new Promise(process.nextTick))
    const addWorkoutButton = wrapper.find(ActionButton).at(1)
    addWorkoutButton.prop('onPress')()
    wrapper.update()
    expect(wrapper.find(Text).at(1).render().text()).toBe('Workout B')
  })

  it('Handles "Save" press', () => {
    const wrapper = shallow(<CreateWorkoutScreen {...props} />)
    const addWorkoutButton = wrapper.find(ActionButton).at(2)
    addWorkoutButton.simulate('press')
    wrapper.update()
    expect(mockCreateWorkoutPlan).toHaveBeenCalled()
  })
})
