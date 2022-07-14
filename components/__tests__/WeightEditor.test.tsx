import ActionButton from '../ActionButton'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import WeightEditor from '../WeightEditor'
import { configure, shallow } from 'enzyme'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { WeightEditorProps } from '../../types/common'
import { WeightUnit } from '../../types/workout'

configure({ adapter: new Adapter() })

const props: WeightEditorProps = {
  exercise: {
    name: 'Bench Press',
    progressiveOverload: false,
    overloadIncrement: 0,
    reps: 39,
    sets: 4,
    weight: 100,
    weightUnit: WeightUnit.Lbs,
  },
  setWeight: jest.fn(),
}

describe('<WeightEditor />', () => {
  it('Renders', () => {
    const wrapper = shallow(<WeightEditor {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Handles long press', () => {
    const wrapper = shallow(<WeightEditor {...props} />)
    
    wrapper.find(TouchableOpacity).simulate('longPress')

    wrapper.setProps({ isEditingWeight: true })
    wrapper.dive().find(TextInput).simulate('changeText', '68')
    expect(props.setWeight).toHaveBeenCalled()
    
    wrapper.find(ActionButton).simulate('press')
  })
})
