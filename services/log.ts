import { Exercise, Log } from '../types/workout'

export const createLog = (exercise: Exercise, counts: Number[]): Log => {
  return {
    data: counts.join(', '),
    date: new Date(),
    exerciseName: exercise.name,
    weight: exercise.weight,
    weightUnit: exercise.weightUnit,
    workoutId: '',
  }
}

export const addOrUpdateLog = (log: Log, logs: Log[]): Log[] => {
  const newLog: Log = { ...log, date: new Date() }
  let newLogs: Log[] = [...logs]

  if (logs.find(l => l.exerciseName === log.exerciseName)) {
    newLogs = logs.map(l => {
      if (l.exerciseName === log.exerciseName) {
        return newLog
      }
      return l
    })
  } else {
    newLogs.push(newLog)
  }

  return newLogs
}
