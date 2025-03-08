import dayjs from "dayjs"

export const useFormattedDate = (date: Date | string) => {
    return dayjs(date).format("MMM DD, YYYY")
}