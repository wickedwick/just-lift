import ActionButton from '../ActionButton';
import Adapter from 'enzyme-adapter-react-16';
import ExerciseCard from '../ExerciseCard';
import React from 'react';
import { Card } from 'react-native-paper';
import { configure, shallow } from 'enzyme';
import { WeightUnit } from '../../types/workout';

configure({ adapter: new Adapter() })

describe('<ExerciseCard />', () => {
  const cardProps = {
    cardIndex: 0,
    exercise: {
      name: 'Squat',
      overloadIncrement: 5,
      progressiveOverload: true,
      reps: 5,
      sets: 5,
      weight: 100,
      weightUnit: WeightUnit.Lbs,
    },
    onEditPress: jest.fn(),
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
    const removeButton = wrapper.find(Card).find(Card.Actions).find(ActionButton).first()
    removeButton.simulate('press')
    expect(cardProps.onRemovePress).toHaveBeenCalled()
  })

  it('Handles edit press', () => {
    const wrapper = shallow(<ExerciseCard {...cardProps} />)
    const removeButton = wrapper.find(Card).find(Card.Actions).find(ActionButton).last()
    removeButton.simulate('press')
    expect(cardProps.onEditPress).toHaveBeenCalled()
  })
})
