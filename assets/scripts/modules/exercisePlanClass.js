export class ExercisePlan {
    constructor(difficulty, bodyPart, exercises) {
        this.difficulty = difficulty;
        this.bodyPart = bodyPart;
        this.exercises = exercises;
    }
}

export class Exercise {
    constructor(reps, exerciseName) {
        this.reps = reps;
        this.exerciseName = exerciseName;
    }
}