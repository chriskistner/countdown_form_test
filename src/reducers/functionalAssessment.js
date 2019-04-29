import {NEXT_QUESTION, SCORE_QUESTION} from '../actions/functionalAssessment';

const assessment= [
    {number: 1, text: "Writing checks, paying bills, balancing checkbook", score: null},
    {number: 2, text: "Assembling tax records, business affairs, or papers.", score: null},
    {number: 3, text: "Shopping alone for clothes, household necessities, or groceries.", score: null},
    {number: 4, text: "playing a game of skill, working on a hobby."},
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
    score: 0,
    attempts: 1,
    startTime: null,
    endTime: null,
    testComp: false
};

export default function functionForm(state=initialState, action) {
    switch(action.type) {

        case NEXT_QUESTION:
            let nextQuestion = state.currentQuestion += 1
            return {...state, question: assessment[nextQuestion]}

        case SCORE_QUESTION:
            const updatedAssessment = assessment;
            updatedAssessment[state.currentQuestion].score = action.payload
            return {...state, assessment: updatedAssessment}

        default:
            return state;
    }
};