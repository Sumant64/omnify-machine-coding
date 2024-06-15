
export function removeAllFilters () {
    return {
        type: "DELETE_FILTERS"
    }
}


export function updateFilters(filterList) {
    console.log(filterList)
    return {
        type: "UPDATE_FILTERS",
        payload: filterList,
    }
}