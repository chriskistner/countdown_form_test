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

export function submitFunctional(assessment, total, startTime, endTime, elapsedTime) {
    return async () => {
        try {
            const token = localStorage.getItem('jwt_access_token');
            const reporter = localStorage.getItem('user')
            const patientUuid= this.props.match.params.patient;
            const timezoneOffset = new Date().getTimezoneOffset()
            await axios(`${url}/cog`,
            {
                method: "post",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: {
                    timestamp: new Date().getTime(),
                    startTime,
                    endTime,
                    timezoneOffset,
                    reporter,
                    patientUuid,
                    testType: 'Functional',
                    version: 'func-v1',
                    elapsedTime,
                    q1: assessment[0].score,
                    q2: assessment[1].score,
                    q3: assessment[2].score,
                    q4: assessment[3].score,
                    q5: assessment[4].score,
                    q6: assessment[5].score,
                    q7: assessment[6].score,
                    q8: assessment[7].score,
                    q9: assessment[8].score,
                    q10: assessment[9].score,
                    total
                }
              });
        } catch (err) {
            console.err(err);
        }
    }
};
