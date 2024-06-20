export const dateFormat = (item) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let date = new Date(item);
    // Sun, 7 Jan 2024, 5:12AM
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.toLocaleTimeString()}`

}