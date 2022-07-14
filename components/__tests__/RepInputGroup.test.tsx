import ActionButton from '../ActionButton'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import RepInputGroup from '../RepInputGroup'
import { configure, shallow } from 'enzyme'
import { RepInputGroupProps } from '../../types/common'
import { WeightUnit } from '../../types/workout'
import { TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

configure({ adapter: new Adapter() })

const props: RepInputGroupProps = {
  counts: [0, 0, 0, 0],
  exercise: {
    name: 'Bench Press',
    progressiveOverload: false,
    overloadIncrement: 0,
    reps: 39,
    sets: 4,
    weight: 100,
    weightUnit: WeightUnit.Lbs,
  },
  setCounts: jest.fn(),
  setLogData: jest.fn(),
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('<RepInputGroup />', () => {
  it('Renders', () => {
    const wrapper = shallow(<RepInputGroup {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Handles long press', () => {
    const wrapper = shallow(<RepInputGroup {...props} />)

    wrapper.find(TouchableOpacity).first().simulate('longPress')

    wrapper.setProps({ repsEditingIndex: 0 })
    wrapper.dive().find(TextInput).simulate('changeText', '68')
    expect(props.setCounts).toHaveBeenCalled()

    wrapper.find(ActionButton).simulate('press')
    expect(props.setLogData).toHaveBeenCalledTimes(1)
  })

  it('Handles button press', () => {
    const wrapper = shallow(<RepInputGroup {...props} />)

    wrapper.find(Button).first().simulate('press')
    expect(props.setCounts).toHaveBeenCalledTimes(1)
  })
})
