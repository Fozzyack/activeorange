let EXERCISE_MEV_INFO = new Map<string, number>();
EXERCISE_MEV_INFO.set('Back', 10);
EXERCISE_MEV_INFO.set('Quads', 8);
EXERCISE_MEV_INFO.set('Hamstrings', 4);
EXERCISE_MEV_INFO.set('Glutes', 5);
EXERCISE_MEV_INFO.set('Chest', 6);
EXERCISE_MEV_INFO.set('Front Delts', 0);
EXERCISE_MEV_INFO.set('Side Delts', 8);
EXERCISE_MEV_INFO.set('Rear Delts', 6);
EXERCISE_MEV_INFO.set('Biceps', 8);
EXERCISE_MEV_INFO.set('Triceps', 6);
EXERCISE_MEV_INFO.set('Calves', 7);
EXERCISE_MEV_INFO.set('Traps', 4);

let EXERCISE_MAV_MIN = new Map<string, number>();
EXERCISE_MAV_MIN.set('Back', 11);
EXERCISE_MAV_MIN.set('Quads', 9);
EXERCISE_MAV_MIN.set('Hamstrings', 5);
EXERCISE_MAV_MIN.set('Glutes', 4);
EXERCISE_MAV_MIN.set('Chest', 7);
EXERCISE_MAV_MIN.set('Front Delts', 0);
EXERCISE_MAV_MIN.set('Side Delts', 9);
EXERCISE_MAV_MIN.set('Rear Delts', 7);
EXERCISE_MAV_MIN.set('Biceps', 9);
EXERCISE_MAV_MIN.set('Triceps', 7);
EXERCISE_MAV_MIN.set('Calves', 9);
EXERCISE_MAV_MIN.set('Abs', 7);
EXERCISE_MAV_MIN.set('Traps', 7);
// EXERCISE_MAV_MIN.set('Forearms', 9);

let EXERCISE_MAV_MAX = new Map<string, number>();
EXERCISE_MAV_MAX.set('Back', 19);
EXERCISE_MAV_MAX.set('Quads', 17);
EXERCISE_MAV_MAX.set('Hamstrings', 12);
EXERCISE_MAV_MAX.set('Glutes', 12);
EXERCISE_MAV_MAX.set('Chest', 19);
EXERCISE_MAV_MAX.set('Front Delts', 12);
EXERCISE_MAV_MAX.set('Side Delts', 24);
EXERCISE_MAV_MAX.set('Rear Delts', 17);
EXERCISE_MAV_MAX.set('Biceps', 19);
EXERCISE_MAV_MAX.set('Triceps', 19);
EXERCISE_MAV_MAX.set('Calves', 19);
EXERCISE_MAV_MAX.set('Abs', 24);
EXERCISE_MAV_MAX.set('Traps', 24);
// EXERCISE_MAV_MAX.set('Forearms', 19);

let exerciseList = [
    'Back',
    'Quads',
    'Hamstrings',
    'Glutes',
    'Chest',
    'Front Delts',
    'Side Delts',
    'Rear Delts',
    'Biceps',
    'Triceps',
    'Calves',
    'Abs',
    'Traps',
    // 'Forearms',
]

export { EXERCISE_MEV_INFO, EXERCISE_MAV_MAX, EXERCISE_MAV_MIN, exerciseList }