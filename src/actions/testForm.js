export const START_TEST = "START_TEST";

export const startTest = () => {
    return (dispatch) => {
        dispatch({
            type: START_TEST
        })
    }
};

