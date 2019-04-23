export const START_TEST = "START_TEST";
export const TICK_UP = "TICK_UP";
export const RESET_TEST = "RESET_TEST";
export const FETCH_USER = "FECTH_USER";

export const fetchUser= () => {
    const user = localStorage.getItem('user') || "Test Doctor";
    return (dispatch) => {
        dispatch({
            type: FETCH_USER,
            payload: user
        })
    }
};

export const startTest = () => {
    return (dispatch) => {
        dispatch({
            type: START_TEST
        })
    }
};

export const tickUp = () => {
    return (dispatch) => {
        dispatch({
            type: TICK_UP
        })
    }
};

export const resetTest = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_TEST
        })
    }
};