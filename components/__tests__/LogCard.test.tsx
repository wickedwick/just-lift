import Adapter from 'enzyme-adapter-react-16';
import LogCard from '../LogCard';
import React from 'react';
import { Card } from 'react-native-paper';
import { configure, shallow } from 'enzyme';
import { WeightUnit } from '../../types/workout';

configure({ adapter: new Adapter() })

describe('<LogCard />', () => {
  const cardProps = {
    log: {
      data: '5x5',
      date: new Date(),
      exerciseName: 'Squat',
      weight: 100,
      weightUnit: WeightUnit.Kg,
      workoutId: '100',
    },
  }

  it('Renders with props', () => {
    const wrapper = shallow(<LogCard {...cardProps} />)
    const view = wrapper.find(Card)
    const title = wrapper.find(Card.Title)
    expect(view).toBeTruthy()
    expect(title.render().text()).toEqual('Squat')
  })
})