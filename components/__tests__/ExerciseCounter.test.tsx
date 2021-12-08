import React from 'react'
import { Button, Card } from 'react-native-paper'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExerciseCounter from '../ExerciseCounter'
import { ExerciseCounterProps } from '../../types/common'
import { Exercise, WeightUnit } from '../../types/workout'

configure({ adapter: new Adapter() })

const exercise: Exercise = {
  name: 'Bench Press',
  weightUnit: WeightUnit.Lbs,
  weight: 200,
  reps: 5,
  sets: 3,
  progressiveOverload: false,
  overloadIncrement: 5
}

const props: ExerciseCounterProps = {
  exercise,
  setLogData: jest.fn()
}

describe('<ExerciseCounter />', () => {
  it('Renders with props', () => {
    const wrapper = shallow(<ExerciseCounter {...props} />)
    expect(wrapper.find(Card)).toHaveLength(1)

    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(3)
  })

  it('Handles click events', () => {
    const wrapper = shallow(<ExerciseCounter {...props} />)
    const buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(3)

    buttons.at(0).simulate('press')
    expect(wrapper.find(Button).at(0).text()).toEqual('5')
    
    wrapper.find(Button).at(1).simulate('press')
    wrapper.find(Button).at(1).simulate('press')
    expect(wrapper.find(Button).at(1).text()).toEqual('4')
    
    wrapper.find(Button).at(2).simulate('press')
    wrapper.find(Button).at(2).simulate('press')
    wrapper.find(Button).at(2).simulate('press')
    expect(wrapper.find(Button).at(2).text()).toEqual('3')
    expect(props.setLogData).toHaveBeenCalledTimes(6)
  })
})
