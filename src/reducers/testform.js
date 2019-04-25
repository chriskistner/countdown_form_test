import {START_TEST, TICK_UP, RESET_TEST, RESET_TICK_UP, FETCH_USER, TEST_BEGAN, TEST_ENDED} from '../actions/testForm';

const initialState = {
    user: null,
    timer: 10,
    testOn: false,
    score: 0,
    attempts: 1,
    startTime: null,
    endTime: null,
    testComp: false
};

export default function testForm(state=initialState, action) {
    switch(action.type) {
        case FETCH_USER:
            return {...state, user: action.payload};
        
        case TEST_BEGAN:
            if (!state.startTime) {
                const testInit = new Date();
                return {...state, startTime: testInit};
            }
            return state

        case TEST_ENDED:
            const testConc = new Date();
            return {...state, endTime: testConc, testComp: true};

        case START_TEST:
            let newTime;
            state.timer > 1 ? newTime = state.timer - 1 : newTime = 0;
            return {...state, timer: newTime, testOn: true};

        case TICK_UP:
            return {...state, score: state.score +=1};

        case RESET_TICK_UP:
            return {...state, attempts: state.attempts +=1};

        case RESET_TEST:
            return state = {...state, timer: 10, testOn: false, score: 0, testComp: false};

        default:
            return state;
    }
};