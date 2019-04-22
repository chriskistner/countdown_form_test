import {START_TEST} from '../actions/testForm';

const initialState = {
    timer: 60,
    score: 0
}

export default function testForm(state=initialState, action) {
    switch(action.type) {

        case START_TEST:
            const newTime = state.timer - 1
            return {...state, timer: newTime}

        default:
            return state;
    }
}