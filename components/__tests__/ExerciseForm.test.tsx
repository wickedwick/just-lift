import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExerciseForm from '../ExerciseForm'
import ActionButton from '../ActionButton'

configure({ adapter: new Adapter() })

describe('<ExerciseForm />', () => {
  const props = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  }

  it('Renders with props', () => {
    const wrapper = shallow(<ExerciseForm {...props} />)
    const view = wrapper.find('View')
    expect(view).toBeTruthy()
  })

  it('Handles cancel press', () => {
    const wrapper = shallow(<ExerciseForm {...props} />)
    const cancelButton = wrapper.find(ActionButton).at(1)
    cancelButton.simulate('press')
    expect(props.onCancel).toHaveBeenCalled()
  })

  it('Handles submit press', () => {
    const wrapper = shallow(<ExerciseForm {...props} />)
    const submitButton = wrapper.find(ActionButton).at(0)
    submitButton.simulate('press')
    expect(props.onSubmit).toHaveBeenCalled()
  })
})
