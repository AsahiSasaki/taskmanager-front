//半角が含まれていないか
export const isFullWidth: (value: string) => boolean = (value: string) => {
    const regExp = /[\x20-\x7E]/
    return !regExp.test(value)
}

//日付になっているか
export const isDate: (value: string) => boolean = (value: string) => {
    return !isNaN(Date.parse(value))
}

//今日以降の日付か
export const isFutureDate: (value: string) => boolean = (value: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const inputDate = new Date(value)
    return inputDate >= today
}
