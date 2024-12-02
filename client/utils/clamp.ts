export default (number: number, min: number, max: number) => {
  return Math.min(Math.max(number, min), max)
}