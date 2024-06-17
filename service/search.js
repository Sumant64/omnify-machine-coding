import data from '../data/data.json';

export const searchPeople = (value) => {
    console.log(data)
    const filterData = data.filter((item) => {
        let regex = new RegExp(value, "i", "g");
        return item.payer.toString().match(regex)
    })

    return filterData.slice(0,10)
}