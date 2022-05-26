import Adapter from 'enzyme-adapter-react-16';
import RadioButton from '../RadioButton';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { RadioButton as PaperRadioButton } from 'react-native-paper';
import { RadioButtonProps } from '../../types/common';

configure({ adapter: new Adapter() })

const props: RadioButtonProps = {
  label: 'New Button',
  value: 'new',
}

describe('<RadioButton />', () => {
  it('Renders', () => {
    const wrapper = shallow(<RadioButton {...props} />)
    const item = wrapper.find(PaperRadioButton.Item)
    
    expect(item).toHaveLength(1)
    expect(item.prop('label')).toEqual('New Button')
    expect(wrapper).toMatchSnapshot()
  })
})
