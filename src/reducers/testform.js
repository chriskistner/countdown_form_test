import {START_TEST, TICK_UP, RESET_TEST} from '../actions/testForm';

const initialState = {
    timer: 60,
    testOn: false,
    score: 0
}

export default function testForm(state=initialState, action) {
    switch(action.type) {

        case START_TEST:
            let newTime;
            state.timer > 1 ? newTime = state.timer - 1 : newTime = 0;
            return {...state, timer: newTime, testOn: true}

        case TICK_UP:
            return {...state, score: state.score +=1}

        case RESET_TEST:
            return {...state, timer: 60, testOn: false, score: 0}

        default:
            return state;
    }
}