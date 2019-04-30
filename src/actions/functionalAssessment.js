import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const NEXT_QUESTION = "NEXT_QUESTION";
export const SCORE_QUESTION = "SCORE_QUESTION";
export const RESET_TEST = "RESET_TEST";
export const TALLY_SCORE = "TALLY_SCORE";

export const nextQuestion = () => {
    return (dispatch) => {
        dispatch({type: NEXT_QUESTION})
    }
};

export const scoreQuestion = (score) => {
    return (dispatch) => {
        dispatch({type: SCORE_QUESTION, payload: score})
    }
};

export const tallyScore = () => {
    return (dispatch) => {
        dispatch({type:TALLY_SCORE})
    }
};

export const resetTest = () => {
    return (dispatch) => {
        dispatch({type: RESET_TEST})
    }
};

