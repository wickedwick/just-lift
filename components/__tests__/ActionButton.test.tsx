import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Button } from 'react-native-paper'
import ActionButton from '../ActionButton'

configure({ adapter: new Adapter() })

const props = {
  icon: 'add',
  text: 'Add',
  onPress: jest.fn(),
  style: {},
}

describe('<ActionButton />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = shallow(<ActionButton {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the onPress function on button press', () => {
    const wrapper = shallow(<ActionButton {...props} />)
    wrapper.find(Button).simulate('press')
    expect(props.onPress).toHaveBeenCalled()
  })
})