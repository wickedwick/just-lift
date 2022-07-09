import Adapter from 'enzyme-adapter-react-16'
import PagingControls from '../PagingControls'
import React from 'react'
import { configure, shallow } from 'enzyme'
import { PagingControlsProps } from '../../types/common'

configure({ adapter: new Adapter() })

const mockSetWorkoutIndex = jest.fn()
const props: PagingControlsProps = {
  workoutIndex: 0,
  workouts: [{ id: 'A', exercises: [] }, { id: 'B', exercises: [] }],
  setWorkoutIndex: mockSetWorkoutIndex,
}

describe('<PagingControls />', () => {
  it('Renders', () => {
    const wrapper = shallow(<PagingControls {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Calls setWorkoutIndex on press', () => {
    const wrapper = shallow(<PagingControls {...props} />)
    wrapper.find('ActionButton').at(0).simulate('press')
    expect(mockSetWorkoutIndex).toHaveBeenCalledWith(1)
  })
})
