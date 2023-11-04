export function splitArray(array: any[], numberChunk: number) {
  const arrayChunk: any[] = [];
  for (let i = 0; i < array.length; i += numberChunk) {
    arrayChunk.push(array.slice(i, i + numberChunk));
  }
  return arrayChunk;
}
