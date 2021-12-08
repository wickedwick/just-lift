import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BlankMenuScreen from '../BlankMenuScreen'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<BlankMenuScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<BlankMenuScreen {...props} />)
    expect(wrapper.find('ScrollView').length).toBe(1)
  })
})
