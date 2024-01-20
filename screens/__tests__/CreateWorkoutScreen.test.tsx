import ActionButton from '../../components/ActionButton';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateWorkoutScreen from '../CreateWorkoutScreen';
import React from 'react';
import { configure, shallow } from 'enzyme';
import { PartialState, StackNavigationState } from '@react-navigation/native';
import { TabOneParamList } from '../../types/common';

configure({ adapter: new Adapter() });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockResetFn = jest.fn();
const props: any = {
    navigation: {
        reset: (
            state:
                | StackNavigationState<TabOneParamList>
                | PartialState<StackNavigationState<TabOneParamList>>
        ): void => {
            mockResetFn();
        },
    },
};

jest.mock('nanoid', () => {
    return { nanoid: () => '1234' };
});

const mockCreateWorkoutPlan = jest.fn();
jest.mock('../../services/workout', () => {
    return {
        createWorkoutPlan: () => {
            mockCreateWorkoutPlan();
            return {
                workouts: [
                    {
                        id: 'A',
                        exercises: [],
                        name: 'Workout 1',
                    },
                ],
                workoutIndex: 0,
            };
        },
    };
});

describe('<CreateWorkoutScreen />', () => {
    it('Renders', () => {
        const wrapper = shallow(<CreateWorkoutScreen {...props} />);
        expect(wrapper.find('ScrollView').length).toBe(1);
    });

    it('Handles "Add Exercise" press', () => {
        const wrapper = shallow(<CreateWorkoutScreen {...props} />);
        const addWorkoutButton = wrapper.dive().find(ActionButton).at(0);
        addWorkoutButton.simulate('press');
        
        const addExerciseButton = wrapper.dive().find(ActionButton).at(0);
        addExerciseButton.simulate('press');

        expect(wrapper.find('ExerciseForm').length).toBe(1);
    });

    it('Handles "On Save" press', () => {
        const wrapper = shallow(<CreateWorkoutScreen {...props} />);
        const saveButton = wrapper.find(ActionButton).at(1);
        
        saveButton.simulate('press');
        wrapper.update();
        
        expect(mockCreateWorkoutPlan).toHaveBeenCalled();
    });
});
