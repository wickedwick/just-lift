import Adapter from 'enzyme-adapter-react-16';
import ProfileScreen from '../ProfileScreen';
import React from 'react';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<ProfileScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<ProfileScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })
})