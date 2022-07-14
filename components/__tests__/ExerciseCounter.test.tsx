import Adapter from 'enzyme-adapter-react-16'
import ExerciseCounter from '../ExerciseCounter'
import React from 'react'
import { Card } from 'react-native-paper'
import { configure, shallow } from 'enzyme'
import { Exercise, WeightUnit } from '../../types/workout'
import { ExerciseCounterProps } from '../../types/common'

configure({ adapter: new Adapter() })

const exercise: Exercise = {
  name: 'Bench Press',
  overloadIncrement: 5,
  progressiveOverload: false,
  reps: 5,
  sets: 3,
  weight: 200,
  weightUnit: WeightUnit.Lbs,
}

const props: ExerciseCounterProps = {
  exercise,
  setLogData: jest.fn(),
  setWeight: jest.fn()
}

describe('<ExerciseCounter />', () => {
  it('Renders with props', () => {
    const wrapper = shallow(<ExerciseCounter {...props} />)
    expect(wrapper.find(Card)).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
