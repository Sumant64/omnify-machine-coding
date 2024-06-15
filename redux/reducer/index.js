const { combineReducers } = require("redux");
const { default: filterReducer } = require("./filterReducer");



const rootReducer = combineReducers({
    filterReducer
})

export default rootReducer;