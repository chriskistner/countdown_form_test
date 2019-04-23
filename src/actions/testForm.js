export const START_TEST = "START_TEST";
export const TICK_UP = "TICK_UP"

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
}

