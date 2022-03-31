import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '../Checkbox';
import React from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { CheckboxProps } from '../../types/common';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() })

const mockOnPress = jest.fn()
const props: CheckboxProps = {
  label: 'New Checkbox',
  status: 'checked',
  onPress: mockOnPress,
}

describe('<Checkbox />', () => {
  it('Renders', () => {
    const wrapper = shallow(<Checkbox {...props} />)
    const item = wrapper.find(PaperCheckbox.Item)
    expect(item).toHaveLength(1)
    expect(item.prop('label')).toEqual('New Checkbox')
    expect(wrapper).toMatchSnapshot()
  })

  it('Executes onPress', () => {
    const wrapper = shallow(<Checkbox {...props} />)
    wrapper.find(PaperCheckbox.Item).simulate('press')
    expect(mockOnPress).toHaveBeenCalled()
  })
})
