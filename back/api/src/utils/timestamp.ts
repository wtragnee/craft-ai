export const fromDateToTimestamp = (input: Date): number => {
  return Math.round(input.getTime() / 1000)
}

export const fromTimestampToDate = (input: number): Date => {
  return new Date(input * 1000)
}
