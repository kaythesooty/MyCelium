/* eslint-disable @typescript-eslint/no-explicit-any */
export default (rows: number, cols: number, fill: any = null) => {
  const matrix = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(fill))
  return matrix
}
