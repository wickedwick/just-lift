import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SelectWorkoutScreen from '../SelectWorkoutScreen';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<SelectWorkoutScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<SelectWorkoutScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })
})
