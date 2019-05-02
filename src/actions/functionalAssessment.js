import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const NEXT_QUESTION = "NEXT_QUESTION";
export const SCORE_QUESTION = "SCORE_QUESTION";
export const RESET_FUNC = "RESET_FUNC";
export const TALLY_SCORE = "TALLY_SCORE";
export const START_FUNC = "START_FUNC";
export const END_FUNC = "END_FUNC";

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

export const resetFunc = () => {
    return (dispatch) => {
        dispatch({type: RESET_FUNC})
    }
};

export const startFunc = () => {
    return (dispatch) => {
        dispatch({
            type: START_FUNC
        })
    }
};

export const endFunc = () => {
    return (dispatch) => {
        dispatch({
            type: END_FUNC
        })
    }
};

export function submitFunctional(assessment, score, testStart, testSubmitted) {
    return async () => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user')
            const patientID = this.props.match.params.patient;
            await axios(`${url}/placeholder`,
            {
                method: "post",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: {
                    userId: user,
                    uuid: patientID,
                    cognitiveTestType: 'Functional',
                    version: 'func-v1',
                    assessment: assessment,
                    score: score,
                    start: testStart,
                    submission: testSubmitted
                }
              });
        } catch (err) {
            console.err(err);
        }
    }
};
