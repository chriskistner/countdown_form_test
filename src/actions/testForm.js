export const START_TEST = "START_TEST";

export const startTest = () => {
    setInterval( function() {
        console.log('firing')
        return (dispatch) => {dispatch({type: START_TEST})}
    }, 1000 )
};

