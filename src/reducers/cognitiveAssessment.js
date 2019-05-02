import {START_TEST, TICK_UP, RESTART_COG, RESET_COG, RESET_TICK_UP, BEGIN_COG, END_COG} from '../actions/cognitiveAssessment';

const initialState = {
    timer: 10,
    testOn: false,
    score: 0,
    attempts: 1,
    startCog: null,
    endCog: null,
    testComp: false
};

export default function cogForm(state=initialState, action) {
    switch(action.type) {

        case BEGIN_COG:
            if (!state.startCog) {
                const testInit = new Date();
                return {...state, startCog: testInit};
            }
            return state

        case END_COG:
            const testConc = new Date();
            return {...state, endCog: testConc, testComp: true};

        case START_TEST:
            let newTime;
            state.timer > 1 ? newTime = state.timer - 1 : newTime = 0;
            return {...state, timer: newTime, testOn: true};

        case TICK_UP:
            return {...state, score: state.score +=1};

        case RESET_TICK_UP:
            return {...state, attempts: state.attempts +=1};

        case RESTART_COG:
            return state = {...state, timer: 10, testOn: false, score: 0, testComp: false};

        case RESET_COG:
            return state = initialState;

        default:
            return state;
    }
};