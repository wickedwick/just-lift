import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SelectWorkoutScreen from '../SelectWorkoutScreen'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<SelectWorkoutScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<SelectWorkoutScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })
})
