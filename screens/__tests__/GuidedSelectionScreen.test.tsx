import Adapter from 'enzyme-adapter-react-16';
import GuidedSelectionScreen from '../GuidedSelectionScreen';
import React from 'react';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() })

const mockCreateWorkoutPlan = jest.fn()
// jest.mock('../../services/workoutFactory', () => {
//   return {
//     createWorkoutPlan: () => {
//       mockCreateWorkoutPlan()
//     }
//   }
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {}

describe('<GuidedSelectionScreen />', () => {
  it('Renders', () => {
    const wrapper = shallow(<GuidedSelectionScreen {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  // it('Executes createWorkout', () => {
  //   const wrapper = shallow(<GuidedSelectionScreen {...props} />)
  //   wrapper.find('ActionButton').first().simulate('press')
  //   expect(mockCreateWorkoutPlan).toHaveBeenCalled()
  // })
})
