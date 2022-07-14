import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import React from 'react'
import SettingsScreen from '../SettingsScreen'
import { Button } from 'react-native-paper'
import { configure, mount, shallow } from 'enzyme'
import { WorkoutPlanContext } from '../../context/WorkoutPlanContext'
import { createWorkoutPlan } from '../../services/workoutFactory'
import { act } from 'react-test-renderer'

configure({ adapter: new Adapter() })

const props: any = {}

const mockContext: any = {
  workoutPlanStore: {
    find: jest.fn(),
    insertAsync: jest.fn(),
    removeAsync: jest.fn(),
  },
  logsStore: {
    find: jest.fn(),
    insertAsync: jest.fn(),
  },
}

describe('<SettingsScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<SettingsScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })

  it('Handles "Delete Workout Plan button" press', async () => {
    const mockSetWorkoutPlan = jest.fn()
    const wrapper = mount(
      <WorkoutPlanContext.Provider value={{ workoutPlan: createWorkoutPlan(3, []), setWorkoutPlan: mockSetWorkoutPlan }}>
        <SettingsScreen {...props} />
      </WorkoutPlanContext.Provider>
    )

    const removeWorkoutPlanButton: Button = wrapper.find(Button).at(0)
    removeWorkoutPlanButton.prop('onPress')()
    expect(mockSetWorkoutPlan).toHaveBeenCalled()
    expect(mockSetWorkoutPlan).toHaveBeenCalledWith(null)
  })
})
