
const emptyFilter = {
    people: [],
    scheduledDate: [],
    service: []
}

const initialState = {
    filters: emptyFilter
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "UPDATE_FILTERS":
            return {
                ...state,
                filters: {
                    ...action.payload,
                }
            }
        case "DELETE_FILTERS": 
            return {
                ...state,
                filters: emptyFilter
            }
        default: 
            return state;
    }
};

export default filterReducer;