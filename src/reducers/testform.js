import {START_TEST, TICK_UP, RESET_TEST, RESET_TICK_UP, FETCH_USER, TEST_BEGAN, TEST_ENDED} from '../actions/testForm';

const initialState = {
    user: null,
    timer: 60,
    testOn: false,
    score: 0,
    resetNum: 0,
    startTime: null,
    endTime: null,
};

export default function testForm(state=initialState, action) {
    switch(action.type) {
        case FETCH_USER:
            return {...state, user: action.payload};
        
        case TEST_BEGAN:
            const testInit = new Date();
            return {...state, startTime: testInit};
        
            case TEST_ENDED:
            const testConc = new Date();
            return {...state, endTime: testConc};

        case START_TEST:
            let newTime;
            state.timer > 1 ? newTime = state.timer - 1 : newTime = 0;
            return {...state, timer: newTime, testOn: true};

        case TICK_UP:
            return {...state, score: state.score +=1};

        case RESET_TICK_UP:
            return {...state, resetNum: state.resetNum +=1};

        case RESET_TEST:
            return {...state, timer: 60, testOn: false, score: 0};

        default:
            return state;
    }
};