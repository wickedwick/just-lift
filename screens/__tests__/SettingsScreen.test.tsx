import Adapter from 'enzyme-adapter-react-16';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import SettingsScreen from '../SettingsScreen';
import { Button } from 'react-native-paper';
import { configure, render, shallow } from 'enzyme';
import { DatabaseContext } from '../../context/DatabaseContext';

configure({ adapter: new Adapter() })

const props: any = {}
const mockWorkoutPlanInsert = jest.fn()
const mockContext: any = {
  workoutPlanStore: {
    find: jest.fn(),
    insertAsync: mockWorkoutPlanInsert,
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

  it('Handles "Delete Workout Plan button" press', () => {
    const spy = jest.spyOn(AsyncStorage, 'removeItem')
    const wrapper = shallow(
      <DatabaseContext.Provider value={mockContext}>
        <SettingsScreen {...props} />
      </DatabaseContext.Provider>
    )

    const removeWorkoutPlanButton = wrapper.dive().find(Button).at(0)
    removeWorkoutPlanButton.simulate('press')
    expect(mockWorkoutPlanInsert).toHaveBeenCalled()
  })
})