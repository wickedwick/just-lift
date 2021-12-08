import React from 'react'
import { Text } from 'react-native'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WorkoutScreen from '../WorkoutScreen'

configure({ adapter: new Adapter() })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<WorkoutScreen />', () => {
  it('Renders', async () => {
      const wrapper = shallow(<WorkoutScreen {...props} />)

      const title = wrapper.find(Text).first()
      expect(title.render().text()).toContain('Workout')
  })
})
