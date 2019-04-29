import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const NEXT_QUESTION = "NEXT_QUESTION";

export const nextQuestion = () => {
    return (dispatch) => {
        dispatch({type: NEXT_QUESTION})
    }
};