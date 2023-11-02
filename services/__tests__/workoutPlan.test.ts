import { createTestWorkouts } from "./workoutFactory";

describe('workoutPlan', () => {
    describe('removeWorkoutAtIndex', () => {
        const workoutPlan = {
            workouts: createTestWorkouts(5),
            daysPerWeek: 3,
            workoutIndex: 0,
            workoutInProgress: false
        };

        it('should remove the workout if exists', () => {
            
        });

        it('should not remove the workout if not present', () => {

        });
    });
});