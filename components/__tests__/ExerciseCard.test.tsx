import React from 'react'
import { Button, Card } from 'react-native-paper'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExerciseCard from '../ExerciseCard'
import { WeightUnit } from '../../types/workout'

configure({ adapter: new Adapter() })

describe('<ExerciseCard />', () => {
  const cardProps = {
    exercise: {
      name: 'Squat',
      sets: 5,
      reps: 5,
      weight: 100,
      weightUnit: WeightUnit.Lbs,
      progressiveOverload: true,
      overloadIncrement: 5,
    },
    cardIndex: 0,
    onRemovePress: jest.fn(),
  }

  it('Renders with props', () => {
    const wrapper = shallow(<ExerciseCard {...cardProps} />)
    const view = wrapper.find(Card)
    const title = wrapper.find(Card.Title)
    expect(view).toBeTruthy()
    expect(title.render().text()).toEqual('Squat')
  })

  it('Handles remove press', () => {
    const wrapper = shallow(<ExerciseCard {...cardProps} />)
    const removeButton = wrapper.find(Card).find(Card.Actions).find(Button)
    removeButton.simulate('press')
    expect(cardProps.onRemovePress).toHaveBeenCalled()
  })
})
