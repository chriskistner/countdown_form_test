import {START_TEST, TICK_UP} from '../actions/testForm';

const initialState = {
    timer: 60,
    testOn: false,
    score: 0
}

export default function testForm(state=initialState, action) {
    switch(action.type) {

        case START_TEST:
            const newTime = state.timer - 1
            return {...state, timer: newTime, testOn: true}

        case TICK_UP:
            return {...state, score: state.score +=1}
        default:
            return state;
    }
}