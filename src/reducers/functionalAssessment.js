import {START_FUNC, END_FUNC, NEXT_QUESTION, SCORE_QUESTION, RESET_FUNC, TALLY_SCORE} from '../actions/functionalAssessment';

const assessment= [
    {number: 1, text: "Writing checks, paying bills, balancing checkbook", score: null},
    {number: 2, text: "Assembling tax records, business affairs, or papers.", score: null},
    {number: 3, text: "Shopping alone for clothes, household necessities, or groceries.", score: null},
    {number: 4, text: "Playing a game of skill, working on a hobby."},
    {number: 5, text: "Heating water, making a cup of coffee, turning off stove after use.", score: null},
    {number: 6, text: "Preparing a balanced meal.", score: null},
    {number: 7, text: "Keeping track of current events.", score: null},
    {number: 8, text: "Paying attention to, understanding, discussing TV book, magazine.", score: null},
    {number: 9, text: "Remembering appointments, family occasions, holidays, medications", score: null},
    {number: 10, text: "Traveling out of neighborhood, driving, arranging to take busess", score: null }

];

const initialState = {
    assessment: assessment,
    question: assessment[0],
    currentQuestion: 0,
    score: null,
    startFunc: null,
    endFunc: null,
    elapsedTime: null
};

export default function functionForm(state=initialState, action) {
    switch(action.type) {

        case START_FUNC:
            const startFunc = new Date().getTime();
            return {...state, startFunc};

        case END_FUNC:
            const endFunc = new Date().getTime();
            const elapsedTime = Math.round((endFunc - state.startFunc) / 1000);
            return {...state, endFunc, elapsedTime};

        case NEXT_QUESTION:
            let nextQuestion = state.currentQuestion += 1
            return {...state, question: assessment[nextQuestion]}

        case SCORE_QUESTION:
            const updatedAssessment = [...assessment];
            updatedAssessment[state.currentQuestion].score = action.payload
            return {...state, assessment: updatedAssessment}

        case TALLY_SCORE:
            const total = assessment.reduce((a, b) => a + b.score, 0)
            return {...state, score: total}

        case RESET_FUNC:
            return state = initialState;

        default:
            return state;
    }
};