import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const START_TEST = "START_TEST";
export const TICK_UP = "TICK_UP";
export const RESET_COG = "RESET_COG";
export const RESTART_COG = "RESTART_COG";
export const FETCH_USER = "FECTH_USER";
export const RESET_TICK_UP = "RESET_TICK_UP";
export const BEGIN_COG = "BEGIN_COG";
export const END_COG = "END_COG";


export const startTest = () => {
    return (dispatch) => {
        dispatch({type: START_TEST})
    }
};

export const tickUp = () => {
    return (dispatch) => {
        dispatch({type: TICK_UP})
    }
};

export const resetCog = () => {
    return (dispatch) => {
        dispatch({type: RESET_COG})
    }
};

export const restartCog = () => {
    return (dispatch) => {
        dispatch({type: RESTART_COG})
    }
};

export const resetTickUp = () => {
    return (dispatch) => {
        dispatch({type: RESET_TICK_UP})
    }
};

export const beginCog = () => {
    return (dispatch) => {
        dispatch({type: BEGIN_COG})
    }
};

export const endCog = () => {
    return (dispatch) => {
        dispatch({type: END_COG})
    }
};

export function submitTest(score, attempts, testStart, testSubmitted) {
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
                    cognitiveTestType: 'Naming',
                    version: 'animals-v1',
                    score: score,
                    attempts: attempts,
                    start: testStart,
                    submission: testSubmitted
                }
              });
        } catch (err) {
            console.err(err);
        }
    }
};