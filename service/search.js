import data from '../data/data.json';

export const searchPeople = (value) => {
    console.log(data)
    const filterData = data.filter((item) => {
        let regex = new RegExp(value, "i", "g");
        return item.payer.toString().match(regex)
    })

    return filterData.slice(0,10)
}

export const searchService = (value) => {
    const distinctData = data.map((item) => {
        return item.services;
    })
    let uniqueNames = [...new Set(distinctData)];
    const filterData = uniqueNames.filter((item) => {
        let regex = new RegExp(value, "i", "g");
        return item.toString().match(regex);
    });

    return filterData.slice(0, 10);
}