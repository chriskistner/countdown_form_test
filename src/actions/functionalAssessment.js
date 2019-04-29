import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const NEXT_QUESTION = "NEXT_QUESTION";
export const SCORE_QUESTION = "SCORE_QUESTION";

export const nextQuestion = () => {
    return (dispatch) => {
        dispatch({type: NEXT_QUESTION})
    }
};

export const scoreQuestion = (score) => {
    return (dispatch) => {
        dispatch({type: SCORE_QUESTION, payload: score})
    }
}